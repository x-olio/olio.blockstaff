namespace gd3d.framework{
    export class WebGLUtils{
    
        /**
     * Creates the HTLM for a failure message
     * @param {string} canvasContainerId id of container of th
     *        canvas.
     * @return {string} The html.
     */
    private makeFailHTML(msg) {
        return '' +
              '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
        // return '' +
        //   '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
        //   '<td align="center">' +
        //   '<div style="display: table-cell; vertical-align: middle;">' +
        //   '<div style="">' + msg + '</div>' +
        //   '</div>' +
        //   '</td></tr></table>';
      };
    
      /**
     * Mesasge for getting a webgl browser
     * @type {string}
     */
    private GET_A_WEBGL_BROWSER = '' +
    'This page requires a browser that supports WebGL.<br/>' +
    '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
    
    /**
    * Mesasge for need better hardware
    * @type {string}
    */
    private OTHER_PROBLEM = '' +
    "It doesn't appear your computer can support WebGL.<br/>" +
    '<a href="http://get.webgl.org">Click here for more information.</a>';
    
    
    /**
     * Creates a webgl context. If creation fails it will
     * change the contents of the container of the <canvas>
     * tag to an error message with the correct links for WebGL.
     * @param {Element} canvas. The canvas element to create a
     *     context from.
     * @param {WebGLContextCreationAttirbutes} opt_attribs Any
     *     creation attributes you want to pass in.
     * @param {function:(msg)} opt_onError An function to call
     *     if there is an error during creation.
     * @return {WebGLRenderingContext} The created context.
     */
    public setupWebGL(canvas:Element, opt_attribs:WebGLContextAttributes = null, opt_onError:(msg:string)=>void =null){
        let handleCreationError= (msg)=> {
            var container = document.getElementsByTagName("body")[0];
          //var container = canvas.parentNode;
          if (container) {
            var str = WebGLRenderingContext ?
                 this.OTHER_PROBLEM :
                 this.GET_A_WEBGL_BROWSER;
            if (msg) {
              str += "<br/><br/>Status: " + msg;
            }
            container.innerHTML = this.makeFailHTML(str);
          }
        };
    
        opt_onError = opt_onError || handleCreationError;
        if (canvas.addEventListener) {
            canvas.addEventListener("webglcontextcreationerror", (event) =>{
                  opt_onError((event as any).statusMessage);
                }, false);
          }
          var context = this.create3DContext(canvas, opt_attribs);
          if (!context) {
            if (!WebGLRenderingContext) {
              opt_onError("");
            } else {
              opt_onError("");
            }
          }
        
          return context;
    }
    
    /**
     * Creates a webgl context.
     * @param {!Canvas} canvas The canvas tag to get context
     *     from. If one is not passed in one will be created.
     * @return {!WebGLContext} The created context.
     */
    public create3DContext(canvas, opt_attribs){
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        var context = null;
        for (var ii = 0; ii < names.length; ++ii) {
          try {
            context = canvas.getContext(names[ii], opt_attribs);
          } catch(e) {}
          if (context) {
            break;
          }
        }
        return context;
    }
    
    constructor(){
        //为了兼容性的冗余处理
        /**
         * Provides requestAnimationFrame in a cross browser
         * way.
         */
        if (!window.requestAnimationFrame) {
            var tempwin = window as any;
            window.requestAnimationFrame = 
                tempwin.requestAnimationFrame ||
                tempwin.webkitRequestAnimationFrame ||
                tempwin.mozRequestAnimationFrame ||
                tempwin.oRequestAnimationFrame ||
                tempwin.msRequestAnimationFrame ||
                     function(/* function FrameRequestCallback */ callback, /* DOMElement Element */element ) {
                       window.setTimeout(callback, 1000/60);
                     };
          }
    
        /** * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame' to reflect an update to the W3C Animation-Timing Spec. 
         * 
         * Cancels an animation frame request. 
         * Checks for cross-browser support, falls back to clearTimeout. 
         * @param {number}  Animation frame request. */
        if (!window.cancelAnimationFrame) {
            var tempwin = window as any;
            window.cancelAnimationFrame = (tempwin.cancelRequestAnimationFrame ||
                                        window.webkitCancelAnimationFrame || tempwin.webkitCancelRequestAnimationFrame ||
                                        tempwin.mozCancelAnimationFrame || tempwin.mozCancelRequestAnimationFrame ||
                                        tempwin.msCancelAnimationFrame || tempwin.msCancelRequestAnimationFrame ||
                                        tempwin.oCancelAnimationFrame || tempwin.oCancelRequestAnimationFrame ||
                                        window.clearTimeout);
            }
        }
    }
}
