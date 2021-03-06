	$(function(){
		send_echo()
	});	
	function send_echo() {       
    	var echo_websocket = new WebSocket("ws://"+url+"/bigscreen-schedule/websocket/bigScreenWebSocket");   
      	echo_websocket.onopen = function () {
            console.log('websocket已连接...');
      	    echo_websocket.send("broadRightScreen");
    	};
         //处理服务端返回消息
   		echo_websocket.onmessage = function (event) {
	   		var datas = JSON.parse(event.data);
	  	   // console.log("QOE指标"+event.data); //处理服务端返回消息
	  	    if (datas.TSR_CODE == "0"){  	        	 	        	
	  	        broadBandRight(datas)	        	
			}else if(datas.TSR_CODE == "1"){	
				//alert("请输入正确的专业代码");				
			}		
  	    };
  	    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  	    window.onbeforeunload = function () {  
           closeWebSocket();  
        }  
        //关闭WebSocket连接  
        function closeWebSocket() {  
           echo_websocket.close();  
        }  
        //websocket断开
 	   	echo_websocket.onclose = function (event) {
        	console.log('websocket已关闭...');
        	//alert("WebSocket连接已关闭");
    	};		
    }
    function broadBandRight(data){
    	var broadBand_chart03 = echarts.init(document.getElementById('broadBand_chart03'));
		var good = 85;//data.body.QOE.theshold.fine;
		//var bad = data.body.QOE.theshold.worse;
	    var goodData = [good,good,good,good,good,good,good,good,good,good,good,good,good];
	    var datas2 = goodData[goodData.length-1];
	    //var badData = [bad,bad,bad,bad,bad,bad,bad,bad,bad,bad,bad,bad,bad];
	    var xAxisQoeJson = [];  
		var yAxisQoeJson = [];    					
		var qoe = data.body.QOE;
		$.each(qoe,function(index,obj){
			xAxisQoeJson.push(obj.name);
			yAxisQoeJson.push(obj.value); 					
		});   							   			
	    var broadBand_option03 = {
	    	tooltip: {
	        	trigger: 'axis',
	        	axisPointer: { // 坐标轴指示器，坐标轴触发有效
	            	type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	       		 },
	   		},
	   		/*legend:{
	   			data:["优秀","略差"],
	   			icon:'rect',
		    	itemWidth:20,
		    	itemHeight:10,
		    	textStyle:{
		    		color:"#fff"
		    	}
	   		},
	   		grid:{
	   			left:"7%",
	   			right:"1%",
	   			top:"8%",
	   			bottom:"15%"
	   		},*/
		    xAxis: {
		        type: 'category',
		        axisLine: {
		            lineStyle: {
		                color: '#51627D'
		            }
		        },
		        
		        axisLabel:{
		        	interval:0,
		        	rotate:40,
		        	margin:10,
		        	textStyle: {
		                "color": "#fff",
		                "fontSize":20             
		           }	        	
		        },
		        splitLine: {
		            show: false,
		        },	       
		        data:xAxisQoeJson
		        //["南京", "无锡", "徐州", "常州","苏州","南通","连云港","淮安","盐城","扬州","镇江","泰州","宿迁"]
		    },
		    yAxis: {
		        type: 'value',
		        min:"80",
		        max:"100",
		        axisLine: {
		            lineStyle: {
		                color: '#51627D'
		            }
		        },
		        splitLine:{
		            lineStyle:{
		                color:"#51627D"
		            }
	        	},
		        axisLabel : {
	                formatter: '{value}',
	                textStyle: {
		                "color": "#fff",
		                "fontSize": 20            
		            }
	            },
		    },
		    series: [{
		        type: 'line',
		        symbolSize: 6,
		        lineStyle: {
		            normal: {
		                color: '#FDC96A',
		                width: 2,
		            },
		        },
		        itemStyle: {
		            normal: {
		                color: "#FDC96A"
		            }
		        },
		        data: yAxisQoeJson
		        //[90.83,91.19,88.29,90.84,90.69,90.34,88.73,90.41,90.02,90.52,90.92,87.11,88.95],
	   		 },{
	   		 	name:"优秀",
	   		 	type:"line",   		 	
	   		 	data:goodData,
	   		 	symbolSize:1,
	   		 	markPoint:{
	   		 		data:[{value:datas2,xAxis:goodData.length-1,yAxis:datas2}],
	   		 		symbolSize:50,
	   		 		itemStyle:{
	   		 			normal:{
	   		 				label:{
	   		 					formatter:function(param){	   		 						
	   		 						return '优秀';
	   		 					},textStyle:{
	   		 						color:"#000",
	   		 						fontSize:12
	   		 					}
	   		 				}
	   		 			}
	   		 		}
	   		 	},
	   		 	itemStyle:{
	   		 		normal:{
	   		 			color:'#85FF0A'
	   		 		}
	   		 	},
	   		 	lineStyle:{normal:{width:2}}
	   		 }
	   		 /*,{
	   		 	name:"略差",
	   		 	type:"line",
	   		 	symbolSize:1,
	   		 	data:badData,
	   		 	itemStyle:{
	   		 		normal:{
	   		 			color:'#28EFFF'
	   		 		}
	   		 	},
	   		 	lineStyle:{normal:{width:2}}
	   		 }*/
		    ]
	    };
	    broadBand_chart03.setOption(broadBand_option03);
	    //国际网站ping感知对比
	    var xAxisInterJson = [];  
		var DXJson = [];    
		var YDJson = [];    
		var LTJson = [];    
		var ping = data.body.ping;
		$.each(ping,function(index,obj){
			xAxisInterJson.push(obj.name);
			DXJson.push(obj.value.DX); 	
			YDJson.push(obj.value.YD); 
			LTJson.push(obj.value.LT); 
		});   	
	    var broadBand_chart04 = echarts.init(document.getElementById('broadBand_chart04'));
	    var broadBand_option04 = {   	       
	        tooltip: {
	            trigger: 'axis'
	        },
	        legend: {
	        	left:"right",	
	            data: ['电信', '移动', '联通'],
	            textStyle:{
			    	color:'#fff',
			    	fontSize:18
			    }	
	        },                   
	        calculable: true,
	        xAxis: [{
	            type: 'category',
	            axisLine: {
		            lineStyle: {
		                color: '#51627D'
		            }
		        },
		        axisLabel: {
		        	"interval":0,
		        	textStyle: {
		                "color": "#fff",
		                "fontSize":20            
		           }
		        },
		        splitLine: {
		            show: false,
		        },	        
	            data:xAxisInterJson
	            //['亚洲', '北美洲', '南美洲','大洋洲','欧洲','港澳台','非洲']
	        }],
	        yAxis: [{
	            type: 'value',
	            axisLine: {
		            lineStyle: {
		                color: '#51627D'
		            }
		        },
		        axisLabel : {
		            formatter: '{value}',
		            textStyle: {
		                "color": "#fff",
		                "fontSize":20          
		            }
		        },
		        splitLine:{
		            lineStyle:{
		                color:"#51627D"
		            }
	        	}
	        }],
	        series: [{
	            name: '电信',
	            type: 'bar',
	            itemStyle: {
	                normal: {
	                    color: '#FF9B28'                   
	                }
	            },
	            data:DXJson
	            //[88,60,56,59,57,70,68]
	        }, {
	            name: '移动',
	            type: 'bar',
	            itemStyle: {
	                normal: {
	                    color: '#28EFFF'
	                }
	            },
	            data:YDJson
	            //[87,64,56,65,59,64,81]
	        }, {
	            name: '联通',
	            type: 'bar',
	            itemStyle: {
	                normal: {
	                    color: '#FA4D41'
	                }
	            },
	            data:LTJson 
	            //[88,61,56,60,62,68,55]
	        }]
	    };
	    broadBand_chart04.setOption(broadBand_option04);
	    //最右边数据
		$("#alarmNumber").text(data.body.alarAll.value);
		if(data.body.alarAll.status == "0"){
			$("#alarmNumber").next().text("正常");
		}else{
			$("#alarmNumber").next().text("不正常");
		}
		$("#alarImportNumber").text(data.body.alarImport.value);
		if(data.body.alarImport.status == "0"){
			$("#alarImportNumber").next().text("正常");
		}else{
			$("#alarImportNumber").next().text("不正常");
		}
		$("#orderNumber").text(data.body.orderAll.value);
		if(data.body.orderAll.status == "0"){
			$("#orderNumber").next().text("正常");
		}else{
			$("#orderNumber").next().text("不正常");
		}
		//表格
		var alarmLists = "";
		for(var i=0;i<data.body.alarFormdata.length;i++){
			alarmLists+='<tr class="wl-table-list"><td>'+
				data.body.alarFormdata[i].name+'</td><td>'+
				data.body.alarFormdata[i].alar+'</td><td>'+
				data.body.alarFormdata[i].order+'</td><td>'+
				data.body.alarFormdata[i].officeOrder+'</td><tr>';
		}
	    $("#alarList").html(alarmLists);
	    //重大障碍升级
	    var maj_upgradList = "";
	    for(var j=0;j<data.body.majUpgrad.length;j++){
	    	maj_upgradList+='<span>'+data.body.majUpgrad[j]+'</span>';
	    }
	    $("#scroll_begin01").html(maj_upgradList);
	    ScrollImgLeft1();
	    //风险操作
	    //风险操作
	    var risk_operatList = "";
	    var risklength = data.body.riskOperat.length;
	    for(var m =0;m<risklength;m++){
	    	$("#riskLength").html('('+risklength+')');
	    	risk_operatList+='<span>'+(m+1)+':'+data.body.riskOperat[m]+'</span>';
	    }
	    $("#scroll_begin02").html(risk_operatList);
	    ScrollImgLeft2();
    }
