$(function(){

    let score = 0;
    let count = 30;
    let bgmonoff=true;
    let bgmvolume=1.0;
    let cloneID,timer;
    let run;

    function getPosition(){
        return {
            //Math.random() 0~1の数字を返します。
            //Math.floor() 小数点以下切り捨て
            left: Math.floor(Math.random() * 800),
            top: Math.floor(Math.random() * 450)
        }
    }

    //キャラを増やす命令
    function appear(){
        //setInterval(やること,〇秒ごと);
        cloneID = setInterval(function(){
            $('.chara:first-child')
            .clone()
            .appendTo('#stage')
            .css(getPosition())
            .animate({opacity: 1}, 2000)
            .animate(getPosition(), 7000);
        },500);
    }

    //キャラを叩いたときの命令
$('#stage').on('click','.chara',function(){
    hitsound()
    console.log(10)
    $(this)
    .css('background-position','bottom')
    .prop('disabled',true)
    .stop(true,false).animate({opacity:0},500,function(){
        $(this).remove();
    })
    score+=100;
    $('.score span').text(score);
})

    //スタートボタンを押してゲームを始める命令
    $('#start').click(function(){
        appear();
        gamebgm()
        $(this).animate({opacity:0},300,function(){
            $(this).remove();
        });
        //タイムカウントスタート
        timer=setInterval(function(){
            if(count<=0){
                clearInterval(timer);
                clearInterval(cloneID);
                $('.chara').prop('disabied',true);
                alert('スコアは'+score+'DES★')
            }else{
                count--;
                $('.count span').text(count);
                if(count <= 10){
                    $('#stage').on('mouseover','.chara',function(){
                        hitsound();
                        $(this)
                        .css('background-position','bottom')
                        .prop('disabled',true)
                        .stop(true,false).animate({opacity:0},500,function(){
                            $(this).remove();
                        })
                        score+=100;
                        $('.score span').text(score);
                    })
                }
            }
        },1000)
    }) 

    function hitsound(){
        run = Math.floor(Math.random() * 4) + 1
        $('#hitsound'+run).get(0).play();
    }
    function gamebgm(){
        $('#gamebgm').get(0).play();
        $('#gamebgm').get(0).volume=bgmvolume;
    }
    $('.bgm_btn').click(function(){
        if(bgmonoff==true){
            $('#gamebgm').get(0).pause();
            bgmonoff=false    
        }else{
            $('#gamebgm').get(0).play();
            bgmonoff=true;
        }
    })
    $('.volume').on('change',function(){
        bgmvolume=$(this).val();
        $('#gamebgm').get(0).volume=bgmvolume;
    })
})
