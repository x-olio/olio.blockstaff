namespace gd3d.framework
{
    /**
     * @private
     */
    export class taskstate
    {
        finish: boolean = false;
        error: boolean = false;
        message: string = null;
        cancel: boolean = false;
        taskCall: (taskstate, state: taskstate) => void = null;
        taskInterface: ITask = null;
    }
    /**
     * @private
     */
    export interface ITask
    {
        move(delta: number, laststate: taskstate, state: taskstate);
    }
    /**
     * @private
     */
    export class taskMgr
    {
        tasks: taskstate[] = [];

        addTaskCall(task: (laststate: taskstate, state: taskstate) => void)
        {
            var st = new taskstate();
            st.taskCall = task;
            this.tasks.push(st);
        }
        addTask(task: ITask)
        {
            var st = new taskstate();
            st.taskInterface = task;
            this.tasks.push(st);
        }
        //lasttask: (laststate: taskstate, state: taskstate) => void;
        laststate: taskstate = null;

        move(delta: number)
        {
            if (this.laststate != null && this.laststate.cancel)
            {
                return;
            }
            if (this.laststate != null && this.laststate.finish == false)
            {
                return;
            }
            var task = this.tasks.shift();
            if(task==null)
            {
                return;
            }
            var state = new taskstate();
            var laststate = this.laststate;
            this.laststate = state;
            if (task.taskInterface == null)
            {
                task.taskCall(laststate, state);
            }
            else
            {
                task.taskInterface.move(delta, laststate, state);
            }
        }
        cancel()
        {
            if (this.laststate != null)
            {
                this.laststate.cancel = true;
            }
        }
    }
}