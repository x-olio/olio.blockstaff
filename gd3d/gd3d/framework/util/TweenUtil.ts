namespace gd3d.framework
{
    /**
     * tween 工具
     */
    export class tweenUtil {
        //transplant by TextFx——Ease Function
    
        /**
         * 获取缓动计算后的进度值
         * @param ease_type 缓动类型
         * @param linear_progress   当前进度值(范围: 0 - 1)
         */
        public static GetEaseProgress(ease_type: tweenMethod, linear_progress: number):number {
            switch (ease_type) {
                case tweenMethod.Linear:
                    return linear_progress;
                case tweenMethod.ExpoEaseOut:
                    return tweenUtil.ExpoEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.ExpoEaseIn:
                    return tweenUtil.ExpoEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.ExpoEaseOutIn:
                    return tweenUtil.ExpoEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.ExpoEaseInOut:
                    return tweenUtil.ExpoEaseInOut(linear_progress, 0, 1, 1);
    
                case tweenMethod.CircEaseOut:
                    return tweenUtil.CircEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.CircEaseIn:
                    return tweenUtil.CircEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.CircEaseOutIn:
                    return tweenUtil.CircEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.CircEaseInOut:
                    return tweenUtil.CircEaseInOut(linear_progress, 0, 1, 1);
    
                case tweenMethod.QuadEaseOut:
                    return tweenUtil.QuadEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.QuadEaseIn:
                    return tweenUtil.QuadEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.QuadEaseOutIn:
                    return tweenUtil.QuadEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.QuadEaseInOut:
                    return tweenUtil.QuadEaseInOut(linear_progress, 0, 1, 1);
    
                case tweenMethod.SineEaseOut:
                    return tweenUtil.SineEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.SineEaseIn:
                    return tweenUtil.SineEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.SineEaseOutIn:
                    return tweenUtil.SineEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.SineEaseInOut:
                    return tweenUtil.SineEaseInOut(linear_progress, 0, 1, 1);
    
                case tweenMethod.CubicEaseOut:
                    return tweenUtil.CubicEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.CubicEaseIn:
                    return tweenUtil.CubicEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.CubicEaseOutIn:
                    return tweenUtil.CubicEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.CubicEaseInOut:
                    return tweenUtil.CubicEaseInOut(linear_progress, 0, 1, 1);
    
                case tweenMethod.QuartEaseOut:
                    return tweenUtil.QuartEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.QuartEaseIn:
                    return tweenUtil.QuartEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.QuartEaseOutIn:
                    return tweenUtil.QuartEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.QuartEaseInOut:
                    return tweenUtil.QuartEaseInOut(linear_progress, 0, 1, 1);
    
                case tweenMethod.QuintEaseOut:
                    return tweenUtil.QuintEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.QuintEaseIn:
                    return tweenUtil.QuintEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.QuintEaseOutIn:
                    return tweenUtil.QuintEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.QuintEaseInOut:
                    return tweenUtil.QuintEaseInOut(linear_progress, 0, 1, 1);
    
                case tweenMethod.ElasticEaseOut:
                    return tweenUtil.ElasticEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.ElasticEaseIn:
                    return tweenUtil.ElasticEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.ElasticEaseOutIn:
                    return tweenUtil.ElasticEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.ElasticEaseInOut:
                    return tweenUtil.ElasticEaseInOut(linear_progress, 0, 1, 1);
    
                case tweenMethod.BounceEaseOut:
                    return tweenUtil.BounceEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.BounceEaseIn:
                    return tweenUtil.BounceEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.BounceEaseOutIn:
                    return tweenUtil.BounceEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.BounceEaseInOut:
                    return tweenUtil.BounceEaseInOut(linear_progress, 0, 1, 1);
    
                case tweenMethod.BackEaseOut:
                    return tweenUtil.BackEaseOut(linear_progress, 0, 1, 1);
                case tweenMethod.BackEaseIn:
                    return tweenUtil.BackEaseIn(linear_progress, 0, 1, 1);
                case tweenMethod.BackEaseOutIn:
                    return tweenUtil.BackEaseOutIn(linear_progress, 0, 1, 1);
                case tweenMethod.BackEaseInOut:
                    return tweenUtil.BackEaseInOut(linear_progress, 0, 1, 1);
    
                default:
                    return linear_progress;
            }
        }
    
    
        /**
         * Easing equation function for a simple linear tweening, with no easing.
         * @param t Current time in seconds.
         * @param b Starting value.
         * @param c Final value.
         * @param d Duration of
         */
        public static Linear(t: number, b: number, c: number, d: number) {
            return c * t / d + b;
        }
    
        /**
        Easing equation function for an exponential (2^t) easing out:
        decelerating from zero velocity.
         */
        public static ExpoEaseOut(t: number, b: number, c: number, d: number) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        }
    
        /**
        Easing equation function for an exponential (2^t) easing in:
        accelerating from zero velocity.
         */
        public static ExpoEaseIn(t: number, b: number, c: number, d: number) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        }
    
        /**
         Easing equation function for an exponential (2^t) easing in/out:   
         acceleration until halfway, then deceleration.  
        */
        public static ExpoEaseInOut(t: number, b: number, c: number, d: number) {
            if (t == 0)
                return b;
    
            if (t == d)
                return b + c;
    
            if ((t /= d / 2) < 1)
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    
        /**
         Easing equation function for an exponential (2^t) easing out/in:   
         deceleration until halfway, then acceleration.  
        */
        public static ExpoEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.ExpoEaseOut(t * 2, b, c / 2, d);
    
            return tweenUtil.ExpoEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    
        /** 
         Easing equation function for a circular (sqrt(1-t^2)) easing out:   
         decelerating from zero velocity.  
        */  
        public static CircEaseOut(t: number, b: number, c: number, d: number) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        }
    
        /** 
         Easing equation function for a circular (sqrt(1-t^2)) easing in:   
         accelerating from zero velocity.  
        */  
        public static CircEaseIn(t: number, b: number, c: number, d: number) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        }
    
        /** 
         Easing equation function for a circular (sqrt(1-t^2)) easing in/out:   
         acceleration until halfway, then deceleration.  
        */   
        public static CircEaseInOut(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    
        /** 
         Easing equation function for a circular (sqrt(1-t^2)) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static CircEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.CircEaseOut(t * 2, b, c / 2, d);
    
            return tweenUtil.CircEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    
        /** 
         Easing equation function for a quadratic (t^2) easing out:   
         decelerating from zero velocity.  
        */   
        public static QuadEaseOut(t: number, b: number, c: number, d: number) {
            return -c * (t /= d) * (t - 2) + b;
        }
    
        /** 
         Easing equation function for a quadratic (t^2) easing in:   
         accelerating from zero velocity.  
        */   
        public static QuadEaseIn(t: number, b: number, c: number, d: number) {
            return c * (t /= d) * t + b;
        }
    
        /** 
         Easing equation function for a quadratic (t^2) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static QuadEaseInOut(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t + b;
    
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    
        /** 
         Easing equation function for a quadratic (t^2) easing out/in:   
         deceleration until halfway, then acceleration.  
        */  
        public static QuadEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.QuadEaseOut(t * 2, b, c / 2, d);
    
            return tweenUtil.QuadEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    
        /** 
         Easing equation function for a sinusoidal (sin(t)) easing out:   
         decelerating from zero velocity.  
        */  
        public static SineEaseOut(t: number, b: number, c: number, d: number) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
    
        }
    
        /** 
         Easing equation function for a sinusoidal (sin(t)) easing in:   
         accelerating from zero velocity.  
        */  
        public static SineEaseIn(t: number, b: number, c: number, d: number) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        }
    
        /** 
         Easing equation function for a sinusoidal (sin(t)) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static SineEaseInOut(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return c / 2 * (Math.sin(Math.PI * t / 2)) + b;
    
            return -c / 2 * (Math.cos(Math.PI * --t / 2) - 2) + b;
        }
    
        /** 
         Easing equation function for a sinusoidal (sin(t)) easing in/out:   
         deceleration until halfway, then acceleration.  
        */  
        public static SineEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.SineEaseOut(t * 2, b, c / 2, d);
    
            return tweenUtil.SineEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    
        /** 
         Easing equation function for a cubic (t^3) easing out:   
         decelerating from zero velocity.  
        */   
        public static CubicEaseOut(t: number, b: number, c: number, d: number) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    
        /** 
         Easing equation function for a cubic (t^3) easing in:   
         accelerating from zero velocity.  
        */  
        public static CubicEaseIn(t: number, b: number, c: number, d: number) {
            return c * (t /= d) * t * t + b;
        }
    
        /** 
         Easing equation function for a cubic (t^3) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static CubicEaseInOut(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t + b;
    
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    
        /** 
         Easing equation function for a cubic (t^3) easing out/in:   
         deceleration until halfway, then acceleration.  
        */    
        public static CubicEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.CubicEaseOut(t * 2, b, c / 2, d);
    
            return tweenUtil.CubicEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    
        /** 
         Easing equation function for a quartic (t^4) easing out:   
         decelerating from zero velocity.  
        */  
        public static QuartEaseOut(t: number, b: number, c: number, d: number) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        }
    
        /** 
         Easing equation function for a quartic (t^4) easing in:   
         accelerating from zero velocity.  
        */  
        public static QuartEaseIn(t: number, b: number, c: number, d: number) {
            return c * (t /= d) * t * t * t + b;
        }
    
        /** 
         Easing equation function for a quartic (t^4) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static QuartEaseInOut(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t + b;
    
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    
        /** 
         Easing equation function for a quartic (t^4) easing out/in:   
         deceleration until halfway, then acceleration.  
        */   
        public static QuartEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.QuartEaseOut(t * 2, b, c / 2, d);
    
            return tweenUtil.QuartEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    
        /** 
         Easing equation function for a quintic (t^5) easing out:   
         decelerating from zero velocity.  
        */  
        public static QuintEaseOut(t: number, b: number, c: number, d: number) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        }
    
        /** 
         Easing equation function for a quintic (t^5) easing in:   
         accelerating from zero velocity.  
        */  
        public static QuintEaseIn(t: number, b: number, c: number, d: number) {
            return c * (t /= d) * t * t * t * t + b;
        }
    
        /** 
         Easing equation function for a quintic (t^5) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static QuintEaseInOut(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    
        /** 
         Easing equation function for a quintic (t^5) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static QuintEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.QuintEaseOut(t * 2, b, c / 2, d);
            return tweenUtil.QuintEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    
        /** 
         Easing equation function for an elastic (exponentially decaying sine wave) easing out:   
         decelerating from zero velocity.  
        */  
        public static ElasticEaseOut(t: number, b: number, c: number, d: number) {
            if ((t /= d) == 1)
                return b + c;
    
            let p = d * 0.3;
            let s = p / 4;
    
            return (c * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        }
    
        /** 
         Easing equation function for an elastic (exponentially decaying sine wave) easing in:   
         accelerating from zero velocity.  
        */  
        public static ElasticEaseIn(t: number, b: number, c: number, d: number) {
            if ((t /= d) == 1)
                return b + c;
    
            let p = d * 0.3;
            let s = p / 4;
    
            return -(c * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
    
        /** 
         Easing equation function for an elastic (exponentially decaying sine wave) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static ElasticEaseInOut(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) == 2)
                return b + c;
    
            let p = d * (0.3 * 1.5);
            let s = p / 4;
    
            if (t < 1)
                return -0.5 * (c * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return c * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        }
    
        /** 
         Easing equation function for an elastic (exponentially decaying sine wave) easing out/in:   
         deceleration until halfway, then acceleration.  
        */  
        public static ElasticEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.ElasticEaseOut(t * 2, b, c / 2, d);
            return tweenUtil.ElasticEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    
        /** 
         Easing equation function for a bounce (exponentially decaying parabolic bounce) easing out:   
         decelerating from zero velocity.  
        */  
        public static BounceEaseOut(t: number, b: number, c: number, d: number) {
            if ((t /= d) < (1 / 2.75))
                return c * (7.5625 * t * t) + b;
            else if (t < (2 / 2.75))
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            else if (t < (2.5 / 2.75))
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            else
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    
        /** 
         Easing equation function for a bounce (exponentially decaying parabolic bounce) easing in:   
         accelerating from zero velocity.  
        */  
        public static BounceEaseIn(t: number, b: number, c: number, d: number) {
            return c - tweenUtil.BounceEaseOut(d - t, 0, c, d) + b;
        }
    
        /** 
         Easing equation function for a bounce (exponentially decaying parabolic bounce) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static BounceEaseInOut(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
            else
                return tweenUtil.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    
        /** 
         Easing equation function for a bounce (exponentially decaying parabolic bounce) easing out/in:   
         deceleration until halfway, then acceleration.  
        */  
        public static BounceEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.BounceEaseOut(t * 2, b, c / 2, d);
            return tweenUtil.BounceEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    
        /** 
         Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing out:   
         decelerating from zero velocity.  
        */  
        public static BackEaseOut(t: number, b: number, c: number, d: number) {
            return c * ((t = t / d - 1) * t * ((1.70158 + 1) * t + 1.70158) + 1) + b;
        }
    
        /** 
         Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing in:   
         accelerating from zero velocity.  
        */   
        public static BackEaseIn(t: number, b: number, c: number, d: number) {
            return c * (t /= d) * t * ((1.70158 + 1) * t - 1.70158) + b;
        }
    
        /** 
         Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing in/out:   
         acceleration until halfway, then deceleration.  
        */  
        public static BackEaseInOut(t: number, b: number, c: number, d: number) {
            let s = 1.70158;
            if ((t /= d / 2) < 1)
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    
        /** 
         Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing out/in:   
         deceleration until halfway, then acceleration.  
        */  
        public static BackEaseOutIn(t: number, b: number, c: number, d: number) {
            if (t < d / 2)
                return tweenUtil.BackEaseOut(t * 2, b, c / 2, d);
            return tweenUtil.BackEaseIn((t * 2) - d, b + c / 2, c / 2, d);
        }
    }
    
    /**
     * tween 方法
     */
    export enum tweenMethod {  //40多种缓动效果
        /** 正常线性*/
        Linear,
        /** 指数曲线*/  
        ExpoEaseOut, ExpoEaseIn, ExpoEaseInOut, ExpoEaseOutIn,
        /** 圆形曲线*/
        CircEaseOut, CircEaseIn, CircEaseInOut, CircEaseOutIn,
        /** 二次方曲线*/
        QuadEaseOut, QuadEaseIn, QuadEaseInOut, QuadEaseOutIn,
        /** 正弦曲线*/
        SineEaseOut, SineEaseIn, SineEaseInOut, SineEaseOutIn,
        /** 三次方曲线*/
        CubicEaseOut, CubicEaseIn, CubicEaseInOut, CubicEaseOutIn,
        /** 四次方曲线*/
        QuartEaseOut, QuartEaseIn, QuartEaseInOut, QuartEaseOutIn,
        /** 五次方曲线*/
        QuintEaseOut, QuintEaseIn, QuintEaseInOut, QuintEaseOutIn,
        /** 橡皮筋弹性曲线*/
        ElasticEaseOut, ElasticEaseIn, ElasticEaseInOut, ElasticEaseOutIn,
        /** 乒乓球弹性曲线*/
        BounceEaseOut, BounceEaseIn, BounceEaseInOut, BounceEaseOutIn,
        /** 回退曲线*/
        BackEaseOut, BackEaseIn, BackEaseInOut, BackEaseOutIn
    }
}