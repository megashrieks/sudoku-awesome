var arr,inter=0;
function init(){
  arr=[];
  for(i=0;i<9;i++){
     arr[i]=new Array();
     for(j=0;j<9;j++){
       arr[i][j]=0;
    }
  }
}
init();

function clear(){
for(i=0;i<9;i++){
for(j=0;j<9;j++){
$("."+i+""+j).val("");
arr[i][j]=0; 
}
}
}
htm="";
function set(){
for(i=0;i<9;i++){
for(j=0;j<9;j++){ 
htm+="<input type='number' class='"+i+""+j+"'>";   
} 
htm+="<br>"; 
}
htm+="<button class='solve'>solve<\/button><button class='clear'>clear<\/button>"; 
htm+="<br><input type='text' class='attatch'><br><button class='validate'>validate<\/button>"; 
document.write(htm);  
}
set(); 
function toArr(){
for(i=0;i<9;i++){
for(j=0;j<9;j++){
arr[i][j]=$("."+i+""+j).val();
if(arr[i][j]==""){arr[i][j]=0;} 
}
}
}
toArr();
var z=0;

var end;
function solve(arr,r,c){z++;
if(!r&&!c){
   var l=find(arr,r,c);}else{var l=find(arr,r,c);}   r=l[0];
   c=l[1];
   if(r==-1){
end=new Date().getTime();
alert("solved in "+(end-start)+"ms");
return true;
} 
   for(var v=1;v<10;v++){
    if(checkrc(arr,r,c,v)&&checkbox(arr,r,c,v)){
     arr[r][c]=v;
     if(solve(arr,r,c)){ 
      return true;
     }
     arr[r][c]=0; 
    }
  }
   return false;
}



var r=0,c=0;


var start;
$(".solve").click(function(){
   toArr(); 
   var f=find(arr,0,0);
start=new Date().getTime();
   if(solve(arr,f[0],f[1])){print(arr);}
else{
alert("unsolvable");
end=new Date().getTime();
};
});
$(".clear").click(function(){
  clear();create();
});
 $(".validate").click(function(){
  validate();
});


$("input").focus(function(){
$("input").removeClass("active-block");
$(this).addClass("active-block");
var c=$(this).attr("class");
var row=c[0];
var col=c[1]; 
highlightBlock(row,col); 
highlightrc(row,col);
});

$("input").blur(function(){
$("input").removeClass("active-block"); 
$("input").removeClass("active-rc"); 
});


function highlightBlock(m,n){
m=Math.floor(m/3)*3;
n=Math.floor(n/3)*3;
for(i=0;i<3;i++){
for(j=0;j<3;j++){
$("."+(m+i)+""+(n+j)).addClass("active-block");
}
}
}
function highlightrc(m,n){
for(i=0;i<9;i++){
$("."+i+""+n).addClass("active-rc");
$("."+m+""+i).addClass("active-rc");
}
} 


function validate(){ 
var at=$(".attatch").val();
at=at.split(",");
for(i=0;i<9;i++){
for(j=0;j<9;j++){
arr[i][j]=at[(i*9)+j];
}
}
print(arr);
}

function find(arr,r,c){
  if(arr[r][c]==0){loc=[r,c];}
  var loc=[-1,-1];
  for(i=0;i<9;i++){
   for(j=0;j<9;j++){
    if(arr[i][j]==0){
     loc=[i,j];
     return loc;
    }
   }
  } 
return loc;
}
  function checkrc(arr,i,j,val){
  for(x=0;x<9;x++){
   if(x!=j){
    if(arr[i][x]==val){return false;}
   }
  }
for(x=0;x<9;x++){
   if(x!=i){
    if(arr[x][j]==val){return false;}
   }
  }
  return true;
}
function checkbox(arr,i,j,val){
   var m=Math.floor(i/3)*3;
   var n=Math.floor(j/3)*3;
   for(x=0;x<3;x++){
     for(y=0;y<3;y++){
       if(arr[m+x][n+y]==val){return false;}
     }
   }
   return true;
}

function create(){
init();
for(i=0;i<9;i++){
for(j=0;j<9;j++){
var chance=Math.random();
var x=0;
if(chance>0.7){x=Math.random()*9;} 
var xf=Math.floor(x);
 
  
arr[i][j]=xf;
}
}  
}
create(); 
function print(arr){
  res="";
  for(i=0;i<9;i++){
   for(j=0;j<9;j++){
    $("."+i+""+j).val(arr[i][j]);
    if(arr[i][j]==0){$("."+i+""+j).val("");}
   }
  }
} 
