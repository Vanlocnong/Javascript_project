//Task:

/**
 * 1.Render song -- OK
 * 2.Scroll top -- OK
 * 3.Play / pause / seek - OK
 * 4.CD rorate - OK
 * 5.new / prev - OK
 * 6.random - OK
 * 7.newt / repeat when  ended - OK
 * 8.active song - OK
 * 9.scroll active song into view
 * 10.play song when click
 */


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playList = $('.playlist');
const player = $('.player')
const cd = $('.cd');
const title = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio')
const playBtn = $('.btn-toggle-play');
const progressSong =$('#progress');
const nextButton =$('.btn-next');
const prevButton =$('.btn-prev');
const repeatButton =$('.btn-repeat');
const randomButton =$('.btn-random');

const app = {
    isPlaying : false,
    currentIndex :0 ,
    isRandom : false,
    isRepeat : false,
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
            path: "./asset/music/Chay-Khoi-The-Gioi-Nay-Speed-Up-Da-LAB-ft-Phuong-Ly-Cukak-Remix-1.mp3",
            image:"./asset/img/chaykhoithegioinay.jpg"
        },
        {
            name:"Chay ve khoc voi anh",
            singer: "Erik",
            path: "./asset/music/Chay-Ve-Khoc-Voi-Anh-Remix-Erik-Cukak-Remix.mp3",
            image:"./asset/img/chayvekhocvoianh.jpg"
        },
        {
            name:"Co dau ai ngo",
            singer: "Tiktok",
            path: "./asset/music/Co-Dau-Ai-Ngo-Remix-Cam-Cukak-Remix.mp3",
            image:"./asset/img/codauaingo.jpg"
        },
        {
            name:"Lan dau tien gap anh",
            singer: "tiktok",
            path: "./asset/music/Lan-Dau-Tien-Gap-Anh-La-Thu-2-Remix-Full-Mp3-Ngo-Lan-Huong.mp3",
            image:"./asset/img/landautiengapanh.jpg"
        },
        {
            name:"Muon roi ma sao con",
            singer: "MTP",
            path: "./asset/music/Muon-Roi-Ma-Sao-Con-Remix-Htrol-Remix-Son-Tung-M-TP.mp3",
            image:"./asset/img/muonroimasaocon.jpg"
        },
        {
            name:"Ngay dau tien",
            singer: "Duc Phuc",
            path: "./asset/music/Ngay-Dau-Tien-Duc-Phuc-1.mp3",
            image:"./asset/img/ngaydautien.jpg"
        },
        {
            name:"tiemedown",
            singer: "US-UK",
            path: "./asset/music/Tie-Me-Down-Remix-REVA-INDO-Remix-Gryffin-ft-Elley-Duhe.mp3",
            image:"./asset/img/tiemedown.jpg"
        },
        {
            name:"Tinh yeu mau nang",
            singer: "Bigdday",
            path: "./asset/music/Tinh-Yeu-Mau-Nang-Remix-Hot-Tiktok-Nguyen-Hoang-Remix.mp3",
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
        playList.innerHTML = htmls.join("")
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

        //xu ly CD quay / dung
        const cdSpinning = [
            {
                transform : 'rotate(360deg)'
            }
        ]
        const cdSpinningTiming = {
            duration  : 8000,
            iterations : Infinity
        }
        const cdAnimation = cdThumb.animate(cdSpinning , cdSpinningTiming)
        cdAnimation.pause()


        //xu ly phong to thu nho cd
        document.onscroll = function () {
            const scrollTop  = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth
        }
        //xu ly khi click nut play
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
            cdAnimation.play()
        }
        
        //khi song pause
        audio.onpause = function(){
            _this.isPlaying= false
            player.classList.remove('playing')
            cdAnimation.pause()
        }

        // xu ly thanh tua the input di chuyen khi bai hat thay doi tien do
        audio.ontimeupdate = function(){
            //audio.currentTime : set or return vi tri phat hien tai trong audio or video
            if(audio.duration){
                percentageSong = Math.floor(audio.currentTime / audio.duration * 100)
                progressSong.value = percentageSong
            }
        }
        //xu ly khi tua bai hat
        progressSong.onchange = function(e){
            const currentPercentage = e.target.value
            const realTimeSong = currentPercentage * audio.duration / 100
            audio.currentTime = realTimeSong
            
        }

        
    }

    //khi click nut next
    nextButton.onclick = function(){
        if(_this.isRandom){
            _this.randomSong()
        }else{
            _this.nextSong()
        }
        player.classList.add('playing')
        audio.play()
        cdAnimation.play()
        
        _this.scrollToActiceSong()
        
        
    },

    // khi click nut prev
    prevButton.onclick = function() {
        if(_this.isRandom){
            _this.randomSong()
        }else{
            _this.prevSong()
        }
        player.classList.add('playing')
        audio.play()
        cdAnimation.play()
        _this.render()
        _this.scrollToActiceSong()
        
    }

    //khi click nut repeat
    repeatButton.onclick = function(e){
        console.log('click repeat')
        _this.isRepeat = !_this.isRepeat
        e.target.classList.toggle('active' , _this.isRepeat)
    }

    //khi click nut random : bat / tat
    randomButton.onclick = function(e) {
        _this.isRandom = !_this.isRandom
        e.target.classList.toggle('active',_this.isRandom)
    }

    // xu ly next song khi onended
    audio.onended = function(){
        if(_this.isRepeat){
            audio.play()
        }else{
            nextButton.click()
        }
    }

    // ====== Lang nghe hanh vi click vao play list =====
    
    
},

    loadCurrentSong : function(){
        title.textContent = this.currentSongs.name
        cdThumb.style.backgroundImage = `url(${this.currentSongs.image})`
        audio.src = this.currentSongs.path  
},
    nextSong : function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
},
    prevSong : function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length-1
        }
        this.loadCurrentSong()
},
    randomSong : function() {
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
        audio.play()
        player.classList.add('playing')
},
    scrollToActiceSong : function(){
        setTimeout(function(){
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block : 'nearest'
            })
        },500)
},
    start: function() {
        //render playlist
        this.render();
        //dinh nghia cac thuoc tinh cho Object
        this.defineProperties()
        //lang nghe xu ly cac dieu kien
        this.handleEvent();
        //render thong tin bai hat dau tien ao UI khi chay
        this.loadCurrentSong()
        console.log('Running ...')
        console.log(this.songs)
        
}
};


app.start()