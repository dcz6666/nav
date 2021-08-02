/*
 * @Author: your name
 * @Date: 2021-08-01 10:02:16
 * @LastEditTime: 2021-08-03 01:13:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nav/src/main.js
 */
const $siteList =$('.siteList');
const $lastLi = $siteList.find('li.last');
const x= localStorage.getItem('x')
console.log("x",x);
const xObject = JSON.parse(x);
 const hashMap=xObject || [
     {logo:"A",logoType:"text", url:"https://www.acfun.cn"},
     {logo:"B",logoType:"image", url:"https://www.bilibili.com"},
 ];
const simplifyUrl =(url)=>{
    return url.replace("https://","")
               .replace("http://","")
               .replace("www.","")
               .replace(/\/.*/,"")
}

 const render=()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
               <div class="site">
                   <div class="logo">${node.logo[0]}</div>
                   <div class="link">${simplifyUrl(node.url)}</div>
                   <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                   </div>
               </div>
       </li>`).insertBefore($lastLi);
       $li.on('click',()=>{
           window.open(node.url)
        })
       $li.on('click','.close',(e)=>{
           e.stopPropagation()
           hashMap.splice(index,1)
           render()
       })
    })
 }
 render()

$('.addButton')
.on('click',()=>{
    let url = window.prompt("请问你要添加的网址是啥？")
    if(url.indexOf("http")!==0){
        url = 'https://'+url
    }
    hashMap.push({logo:simplifyUrl(url)[0].toUpperCase(),logoType:'text',url:url})
    render()
})
window.onbeforeunload=()=>{
    const string= JSON.stringify(hashMap);
    console.log("string",string);
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
    const {key} =e;
    for(let i=0; i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }

})