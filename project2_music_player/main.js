//Task:

/**
 * 1.Render song -- OK
 * 2.Scroll top -- OK
 * 3.Play / pause / seek
 * 4.CD rorate
 * 5.new / prev
 * 6.random
 * 7.newt / repeat when  ended
 * 8.active song
 * 9.scroll active song into view
 * 10.play song when click
 */


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $('.player')
const cd = $('.cd');
const title = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')


const app = {
    isPlaying : false,
    currentIndex :0 ,
    songs:[
        {
            name:"Bach nguyet quang",
            singer: "china",
            path: "./asset/music/Bach-Nguyet-Quang-Va-Not-Chu-Sa-full-Tiktok-Dai-Tu.mp3",
            image:"./asset/img/bachnguyetquang.jpg"
        },
        {
            name:"chay khoi the gioi",
            singer: "Dalab",
            path: "./asset/img/Chay-Khoi-The-Gioi-Nay-Speed-Up-Da-LAB-ft-Phuong-Ly-Cukak-Remix-1.mp3",
            image:"./asset/img/chaykhoithegioinay.jpg"
        },
        {
            name:"Chay ve khoc voi anh",
            singer: "Erik",
            path: "./asset/img/Chay-Ve-Khoc-Voi-Anh-Remix-Erik-Cukak-Remix.mp3",
            image:"./asset/img/chayvekhocvoianh.jpg"
        },
        {
            name:"Co dau ai ngo",
            singer: "Tiktok",
            path: "./asset/img/Co-Dau-Ai-Ngo-Remix-Cam-Cukak-Remix.mp3",
            image:"./asset/img/codauaingo.jpg"
        },
        {
            name:"Lan dau tien gap anh",
            singer: "tiktok",
            path: "./asset/img/Lan-Dau-Tien-Gap-Anh-La-Thu-2-Remix-Full-Mp3-Ngo-Lan-Huong.mp3",
            image:"./asset/img/landautiengapanh.jpg"
        },
        {
            name:"Muon roi ma sao con",
            singer: "MTP",
            path: "./asset/img/Muon-Roi-Ma-Sao-Con-Remix-Htrol-Remix-Son-Tung-M-TP.mp3",
            image:"./asset/img/muonroimasaocon.jpg"
        },
        {
            name:"Ngay dau tien",
            singer: "Duc Phuc",
            path: "./asset/img/Ngay-Dau-Tien-Duc-Phuc-1.mp3",
            image:"./asset/img/ngaydautien.jpg"
        },
        {
            name:"tiemedown",
            singer: "US-UK",
            path: "./asset/img/Tie-Me-Down-Remix-REVA-INDO-Remix-Gryffin-ft-Elley-Duhe.mp3",
            image:"./asset/img/tiemedown.jpg"
        },
        {
            name:"Tinh yeu mau nang",
            singer: "Bigdday",
            path: "./asset/img/Tinh-Yeu-Mau-Nang-Remix-Hot-Tiktok-Nguyen-Hoang-Remix.mp3",
            image:"./asset/img/tinhyeumaunang.jpg"
        }
    
    ],
    render: function(){
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
                <div
                class="thumb"
                style="
                    background-image: url('${song.image}');
                "
                ></div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            
            `
        })
        $(".playlist").innerHTML = htmls.join("")
    },

    defineProperties : function(){
        Object.defineProperty(this , 'currentSongs' , {
            get : function(){
                return this.songs[this.currentIndex]
            }
        } )
    },

    handleEvent : function() {
        
        const _this = this;
        const cdWidth = cd.offsetWidth;

        //xu ly phong to thu nho cd
        document.onscroll = function () {
            const scrollTop  = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth
        }
        
        //xu ly khi play
        playBtn.onclick = function(){
            if(_this.isPlaying) {
                
                audio.pause()
                
            }else{
                audio.play()
            }

        //khi bai hat dc play
        audio.onplay = function(){
        _this.isPlaying= true
            player.classList.add('playing')
        }
        
        //khi song pause
        audio.onpause = function(){
            _this.isPlaying= false
            player.classList.remove('playing')
        }
    }
},

    loadCurrentSong : function(){
        

        title.textContent = this.currentSongs.name
        cdThumb.style.backgroundImage = `url(${this.currentSongs.image})`
        audio.src = this.currentSongs.path
        
},


    start: function() {
        //dinh nghia cac thuoc tinh cho Object
        this.defineProperties()

        //lang nghe xu ly cac dieu kien
        this.handleEvent();

        //render thong tin bai hat dau tien ao UI khi chay
        this.loadCurrentSong()

        //render playlist
        this.render();
        
    }
} 

app.start()