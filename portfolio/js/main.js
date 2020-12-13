var Button = document.querySelector('.menu-button');
var navOpen = document.querySelectorAll('.menu-list');

function open() {
    navOpen.forEach(e => e.classList.toggle('enabled'));
}

Button.onclick = function() { open()}

//scroll
var scrollCheck = () => {
    var scroll = window.scrollY / 2;
    document.querySelector('#bg_intro').setAttribute('style', `transform: translateY(${scroll}px)`);

    var opacity = (1 - Math.min((window.scrollY * 1.2) / window.innerHeight, 1));
    // 900 100 background image animation

    document.querySelector('.intro').setAttribute('style', `opacity: ${opacity};`);

    var cards = document.querySelectorAll('.card');  //services animation
    cards.forEach(card => {
        
        if(window.scrollY > (card.offsetTop - 450)){
            card.setAttribute('style','animation-play-state: running;')
        }
    })


    var galery = document.querySelectorAll('.galery-image'); //galery animation
    galery.forEach(g => {
        
        if(window.scrollY > (g.offsetTop - 450)){
            g.setAttribute('style','animation-play-state: running;')
        }
    })

    
    var flip = document.querySelectorAll('.flip');  //flip animation
    flip.forEach(f => {
        if(window.scrollY > (f.offsetTop - 450)){
            f.setAttribute('style','animation-play-state: running;')
        }

    })
    

    var apear = document.querySelectorAll('.apear'); //apear animation
    apear.forEach(a => {
        if(window.scrollY > (a.offsetTop - 450)){
            a.setAttribute('style', 'animation-play-state: running;')
        }
    })
}
scrollCheck();
window.addEventListener('scroll', scrollCheck);

//Section listener
(() => {
    var sectionData = {
        'iqloft': {
            title: "iQ Loft E-Learning Platform",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            src: "/images/project3.jpg"
        }
    }
    var sectionElements = document.querySelectorAll('[data-section]');
    sectionElements.forEach(e => {
        e.addEventListener('click', () => {
            var section = e.getAttribute('data-section');
            var singleData = sectionData[section];
            if(singleData){
                //Lock body
                document.body.classList.add('body-lock');

                //Unlock body and remove modal
                var removeModal = () => {
                    modalWrapper.remove();
                    document.body.classList.remove('body-lock');
                }

                var modalWrapper = document.createElement('div');
                modalWrapper.addEventListener('click', removeModal);
                modalWrapper.classList.add('modal-wrapper');
                modalWrapper.innerHTML = `<div class="modal-main" onclick="event.stopPropagation()">
                    <div class="modal-img">
                        <img src="${singleData.src}">
                    </div>
                    <div class="modal-title"><i class="fas fa-chevron-right"></i> ${singleData.title}</div>
                    <div class="modal-description">${singleData.description}</div>
                </div>`;
                var closeButton = document.createElement('button');
                closeButton.textContent = 'Close'
                closeButton.classList.add('modal-button');
                closeButton.addEventListener('click', removeModal)
                modalWrapper.querySelector('.modal-main').append(closeButton);
                document.body.append(modalWrapper);
            }
        })
    });

    
    

    //Contact button
    document.querySelector('#contactButton')?.addEventListener('click' , async () => {

        var callModal = (title, desc, buttons) => {
            
            var modalWrapper = document.createElement('div');

            //Lock body
            document.body.classList.add('body-lock');

            //Unlock body and remove modal
            var removeModal = () => {
                modalWrapper.remove();
                document.body.classList.remove('body-lock');
            }

            modalWrapper.addEventListener('click', removeModal);
            modalWrapper.classList.add('modal-wrapper');
            modalWrapper.innerHTML = `<div class="modal-main" onclick="event.stopPropagation()">
                <div class="modal-title">${title}</div>
                <div class="modal-description">${desc}</div>
                <div class="modal-buttons"></div>
            </div>`;
            
            buttons.forEach(x => {
                var domButton = document.createElement('button');
                domButton.textContent = x.label
                domButton.classList.add('modal-button');
                domButton.addEventListener('click', () => {x.postFunction(); removeModal();})
                modalWrapper.querySelector('.modal-buttons').append(domButton);
            })
            document.body.append(modalWrapper);
        
        }

        var successResponse = () => {
            callModal('Success', 'Email was successfully sent!', []);
        }
        var errorResponse = () => {
            callModal('Error', 'Unexpected error with sending an email! Try an alternative way of sending an email?',[{
                label: 'Send',
                postFunction: () => {
                    window.location.href = "mailto:paeksandar@gmail.com";
                }
            },{
                label: 'Cancel',
                postFunction: () => {}
            }]);
        }

        try {
            var payloadData = {};
            document.querySelector('.contact-form-main').querySelectorAll('[data-contact]').forEach(x => {
                var attr = x.getAttribute('data-contact');
                payloadData[attr] = x.value;
            })
            console.log(payloadData);
            
            var response = await fetch('url', {
                body: JSON.stringify(payloadData),
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(x => (x.status === 200 ? x.json() : null));
            if(response){ successResponse(); }
            else { errorResponse(); }
        } catch { errorResponse(); }
    })
    
})();