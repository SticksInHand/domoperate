/**
 * Created by M.Jin on 14-7-29.
 */

function getByClassName(parent,classChild){
    if(parent.getElementsByClassName){
        return parent.getElementsByClassName(classChild);
    }else{
        var results = new Array();
        var items = parent.getElementsByTagName("*");
        for(var i = 0;i<=items.length;i++){
            if(items[i].className.indexOf(classChild) != -1){
                results[results.length] = items[i];
            }
        }
        return results;
    }
}

//  <div class="row"><div>这是第一条</div><a href="javascript:;">修改</a></div>

function addRow(){
    var upList = getByClassName(document,"list");

    var Orow = document.createElement("div");
    var Orowdiv = document.createElement("div");
    var Otext = document.createTextNode("未命名");
    var Oxiugai = document.createElement("a");
    var Oxiugaitext = document.createTextNode("修改");

    Orow.className = "row";
    Oxiugai.setAttribute("href","javascript:;");

    Orowdiv.appendChild(Otext);
    Oxiugai.appendChild(Oxiugaitext);
    Orow.appendChild(Orowdiv);
    Orow.appendChild(Oxiugai);
    Oxiugai.onclick = function(){
        if(this.innerText == "修改"){
            editGet(this.parentNode);
        }else{
            editSet(this.parentNode);
        }
    };

    upList[0].appendChild(Orow);

}

function getNumber(){
    var listHd = getByClassName(document,"item_count");
    var list = getByClassName(document,"row").length;

    listHd[0].innerText = list;
}

function editGet(Othis){
    var Othistext = Othis.getElementsByTagName("div")[0].innerText;

    var Oinput = document.createElement('input');
    Oinput.setAttribute("value",Othistext);
    Oinput.setAttribute("type","text");

    var Oxiugai = Othis.getElementsByTagName("a");
    Oxiugai[0].innerText = "保存";
    Othis.insertBefore(Oinput,Oxiugai[0]);

    Othis.getElementsByTagName("div")[0].style.display = "none";
}

function editSet(Othis){
    var Othistext = Othis.getElementsByTagName("input")[0].value;
    if(Othistext != ""){
        var Odiv = Othis.getElementsByTagName("div");
        var Oxiugai = Othis.getElementsByTagName("a");
        var Oinput = Othis.getElementsByTagName("input");

        Odiv[0].style.display = "inline";
        Oinput[0].parentNode.removeChild(Oinput[0]);
        Odiv[0].innerText = Othistext;
        Oxiugai[0].innerText = "修改";
    }

}

window.onload = function(){
    getNumber();

    var Oft = getByClassName(document,"ft");
    var Oxiu = getByClassName(document,"row");

    Oft[0].onclick = function(){
        addRow();
        getNumber();
        return false;
    };

    for(var i = 0;i<Oxiu.length;i++){
        (function(ii){
            var m = Oxiu[ii].getElementsByTagName("a");

            m[0].addEventListener('click',function(e){
                if(m[0].innerText == "修改"){
                    editGet(m[0].parentNode);
                }else{
                    editSet(m[0].parentNode);
                }
            },false);
        })(i);
    }
};