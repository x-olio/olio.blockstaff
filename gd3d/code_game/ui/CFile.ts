namespace Game.ui
{
    export class CFile
    {
        public static Show(select: (file: File) => void, mimeType?: string)
        {
            let inp_file = document.createElement("input");
            inp_file.type = "file";
            inp_file.style.display = "none";
            inp_file.accept = ".png,.jpg";
            inp_file.name = "file";
            inp_file.onchange = (ev) =>
            {
                
                console.log(ev);
                let file: File = inp_file.files[0];
                if (file)
                    select(file);
            };
            document.body.append(inp_file);
            setTimeout(() =>
            {
                inp_file.click();
                inp_file.remove();
            }, 1);
        }
    }
}