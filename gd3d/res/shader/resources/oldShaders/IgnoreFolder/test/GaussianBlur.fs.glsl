uniform sampler2D _MainTex;
uniform lowp float _BlurGap; //卷积每层间隔单位
uniform lowp float _BlurSigma; //二维正太分布中的西格玛值
uniform lowp float _BlurLayer; //卷积层数
uniform highp vec4 _MainTex_TexelSize;
varying highp vec2 xlv_TEXCOORD0;

const lowp float max_Num = 100.0;

//高斯模糊 算法获取权重矩阵 rx ,ry 以当前采样点 为原点的相对坐标
lowp float getGausWeight(lowp float rx,lowp float ry)
{
	lowp float pi = 3.1415926535898 ;
	lowp float xDistance = float(rx*rx);
	lowp float yDistance = float(ry*ry);
	lowp float sigma22 = 2.0*_BlurSigma*_BlurSigma;
	lowp float sigma22PI = pi*sigma22;

	return exp(-(xDistance + yDistance)/sigma22)/sigma22PI;
}

void main() 
{
	lowp float size =2.0 * _BlurLayer + 1.0;

	highp vec4 color;
	highp vec4 sample;
	lowp float tx;
	lowp float ty;
	lowp float rx;
	lowp float ry;
	lowp float sum;
	lowp float tempWeight;
	for(lowp float i=0.0 ; i<max_Num ; i +=1.0){
		if(i >=size) {break;}
		for(lowp float j=0.0 ; j<max_Num ; j +=1.0){
			if(j >=size) {break;}
			rx = -_BlurLayer + i;
			ry = -_BlurLayer + j;
			tx = rx * _MainTex_TexelSize.x * _BlurGap;
			ty = ry * _MainTex_TexelSize.y * _BlurGap;
			tempWeight = getGausWeight(rx,ry);
			sample = texture2D(_MainTex,vec2(xlv_TEXCOORD0.x + tx ,xlv_TEXCOORD0.y + ty));   
			color +=sample * tempWeight;  
			sum += tempWeight; 
		}
	}

    gl_FragData[0] = color/sum;  
}








