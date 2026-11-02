/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for(i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }

    if(itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        });

        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        });

        tab.classList.add('qualification__active');
    })
})

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById('contact-form')

if (contactForm) {
    const contactStatus = document.getElementById('contact-status')
    const contactButton = contactForm.querySelector('button[type="submit"]')

    const contactFailureText = (detail) => {
        const text = String(detail || '').replace(/\s+/g, ' ').trim()
        if (/activ/i.test(text)) {
            return 'Check pyaynyithu@gmail.com and open the Activate Form email, then send again.'
        }
        if (/web server|html file|referer/i.test(text)) {
            return 'Open this site from the local server or the published page, then send again.'
        }
        if (!text || text === 'send failed' || /failed to fetch|networkerror|load failed/i.test(text)) {
            return 'The message could not be sent because this browser blocked the request. Use the email address above.'
        }
        return text.length > 180 ? `${text.slice(0, 177)}...` : text
    }

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const honey = contactForm.querySelector('.contact__honey')
        if (honey && honey.value) return

        const name = document.getElementById('contact-name').value.trim()
        const email = document.getElementById('contact-email').value.trim()
        const project = document.getElementById('contact-project').value.trim()
        const message = document.getElementById('contact-message').value.trim()
        const subject = project ? `Portfolio: ${project}` : 'Portfolio inquiry'

        contactButton.disabled = true
        contactStatus.className = 'contact__note'
        contactStatus.textContent = 'Sending...'

        try {
            const response = await fetch('https://formsubmit.co/pyaynyithu@gmail.com', {
                method: 'POST',
                referrerPolicy: 'no-referrer',
                body: new URLSearchParams({
                    name,
                    email,
                    project: project || 'Not specified',
                    message,
                    _subject: subject,
                    _replyto: email,
                    _template: 'box',
                    _captcha: 'false',
                    _url: 'https://pyaynyithu.github.io/my-portfolio/',
                }),
            })
            const raw = await response.text()
            const paragraph = raw.match(/<p>([\s\S]*?)<\/p>/i)
            const serviceMessage = (paragraph ? paragraph[1] : raw).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
            if (!response.ok || !/submitted successfully/i.test(serviceMessage)) {
                throw new Error(serviceMessage || 'send failed')
            }

            contactForm.reset()
            contactStatus.className = 'contact__note contact__note--success'
            contactStatus.textContent = 'Message sent. I will reply to the email you entered.'
        } catch (error) {
            contactStatus.className = 'contact__note contact__note--error'
            contactStatus.textContent = contactFailureText(error && error.message)
        } finally {
            contactButton.disabled = false
        }
    })
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== HEADLINE TYPEWRITER ====================*/
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function typeHeadlines() {
    const lines = [...document.querySelectorAll('.home__data .type-live')]
    if (lines.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const name = lines[0].textContent
    const roles = [
        'Full Stack Software Engineer',
        'Laravel Developer',
        'Vue.js Developer',
    ]

    const nameNode = document.createTextNode('')
    lines[0].textContent = ''
    lines[0].append(nameNode)
    for (const char of name) {
        nameNode.data += char
        await wait(48)
    }

    const roleNode = document.createTextNode('')
    const caret = document.createElement('span')
    caret.className = 'type-cursor'
    caret.setAttribute('aria-hidden', 'true')
    lines[1].textContent = ''
    lines[1].append(roleNode, caret)
    await wait(350)

    let index = 0
    while (true) {
        const role = roles[index % roles.length]
        for (const char of role) {
            roleNode.data += char
            await wait(28)
        }
        await wait(1800)
        while (roleNode.data.length) {
            roleNode.data = roleNode.data.slice(0, -1)
            await wait(18)
        }
        await wait(280)
        index += 1
    }
}

typeHeadlines()

/*==================== PROJECT GALLERY ====================*/
const projectGalleries = {
    ziwa: {
        title: 'Ziwa Thukha Healthcare',
        slides: [
            { src: 'assets/img/projects/ziwathukha-1.png', caption: 'Billing dashboard.' },
            { src: 'assets/img/projects/ziwathukha-2.png', caption: 'Staff roles.' },
            { src: 'assets/img/projects/ziwathukha-3.png', caption: 'Doctor timeslots.' },
            { src: 'assets/img/projects/ziwathukha-4.png', caption: 'Marketing setup.' },
            { src: 'assets/img/projects/ziwathukha-5.png', caption: 'Digital logbook.' },
        ],
    },
    heal: {
        title: 'Heal by Pun Hlaing',
        slides: [
            { src: 'assets/img/projects/heal-1.webp', caption: 'Home. On-demand care, records, and doctor chat.' },
            { src: 'assets/img/projects/heal-2.webp', caption: 'Find doctors, online and in person.' },
            { src: 'assets/img/projects/heal-3.webp', caption: 'Patient profile.' },
            { src: 'assets/img/projects/heal-4.webp', caption: 'On-demand appointment.' },
            { src: 'assets/img/projects/heal-5.webp', caption: 'Settings.' },
        ],
    },
    'star-city': {
        title: 'Star City Living',
        slides: [
            { src: 'assets/img/projects/star-city-1.png', caption: 'Active residents.' },
            { src: 'assets/img/projects/star-city-2.png', caption: 'Maintenance case.' },
            { src: 'assets/img/projects/star-city-4.png', caption: 'Subscriptions.' },
            { src: 'assets/img/projects/star-city-5.webp', caption: 'Star Assist requests.' },
            { src: 'assets/img/projects/star-city-6.webp', caption: 'Resident app home.' },
            { src: 'assets/img/projects/star-city-7.webp', caption: 'Bill payment.' },
        ],
    },
    governors: {
        title: "Governor's Club Yangon",
        slides: [
            { src: 'assets/img/projects/governors-1.png', caption: "Governor's Residence." },
            { src: 'assets/img/projects/governors-2.png', caption: 'Member wallet.' },
            { src: 'assets/img/projects/governors-3.png', caption: 'Active memberships.' },
            { src: 'assets/img/projects/governors-4.png', caption: 'Membership detail.' },
            { src: 'assets/img/projects/governors-5.png', caption: 'Roles and permissions.' },
        ],
    },
    'quiet-place': {
        title: 'Quiet Place',
        slides: [
            { src: 'assets/img/qp.png', caption: 'Room search for meeting rooms and classrooms.' },
        ],
    },
}

const projectGallery = document.getElementById('project-gallery')

if (projectGallery) {
    const galleryDialog = projectGallery.querySelector('.gallery__dialog')
    const galleryTitle = document.getElementById('gallery-title')
    const galleryCaption = document.getElementById('gallery-caption')
    const galleryImage = document.getElementById('gallery-image')
    const galleryDots = document.getElementById('gallery-dots')
    const galleryDetails = document.getElementById('gallery-details')
    let galleryKey = null
    let galleryIndex = 0
    let galleryOpener = null

    const galleryButtons = () => [...galleryDialog.querySelectorAll('button, a[href]')].filter((item) => item.offsetParent !== null)

    const renderGallery = () => {
        const project = projectGalleries[galleryKey]
        const slide = project.slides[galleryIndex]
        galleryTitle.textContent = project.title
        galleryCaption.textContent = slide.caption
        galleryImage.src = slide.src
        galleryImage.alt = slide.caption
        galleryDots.querySelectorAll('.gallery__dot').forEach((dot, dotIndex) => {
            const active = dotIndex === galleryIndex
            dot.classList.toggle('gallery__dot--active', active)
            if (active) dot.setAttribute('aria-current', 'true')
            else dot.removeAttribute('aria-current')
        })
        galleryDialog.classList.toggle('gallery__dialog--single', project.slides.length < 2)
    }

    const fillGalleryDetails = (button) => {
        const data = button.closest('.portfolio__card')?.querySelector('.portfolio__data')
        galleryDetails.textContent = ''
        if (!data) return
        const copy = data.cloneNode(true)
        copy.querySelector('.portfolio__title')?.remove()
        copy.querySelectorAll('.portfolio__open').forEach((control) => control.remove())
        galleryDetails.appendChild(copy)
    }

    const openGallery = (key, button) => {
        galleryKey = key
        galleryIndex = 0
        galleryOpener = button
        galleryDots.textContent = ''
        fillGalleryDetails(button)
        projectGalleries[key].slides.forEach((slide, slideIndex) => {
            const dot = document.createElement('button')
            dot.type = 'button'
            dot.className = 'gallery__dot'
            dot.setAttribute('aria-label', `Show ${slide.caption}`)
            dot.addEventListener('click', () => {
                galleryIndex = slideIndex
                renderGallery()
            })
            galleryDots.appendChild(dot)
        })
        renderGallery()
        projectGallery.hidden = false
        document.body.style.overflow = 'hidden'
        projectGallery.querySelector('.gallery__close').focus()
    }

    const closeGallery = () => {
        projectGallery.hidden = true
        document.body.style.overflow = ''
        galleryImage.removeAttribute('src')
        galleryDetails.textContent = ''
        galleryDialog.classList.remove('gallery__dialog--single')
        if (galleryOpener) galleryOpener.focus()
    }

    const stepGallery = (delta) => {
        const count = projectGalleries[galleryKey].slides.length
        galleryIndex = (galleryIndex + delta + count) % count
        renderGallery()
    }

    document.querySelectorAll('[data-gallery]').forEach((button) => {
        button.addEventListener('click', () => openGallery(button.dataset.gallery, button))
    })

    projectGallery.querySelectorAll('[data-gallery-close]').forEach((control) => {
        control.addEventListener('click', closeGallery)
    })
    projectGallery.querySelector('[data-gallery-prev]').addEventListener('click', () => stepGallery(-1))
    projectGallery.querySelector('[data-gallery-next]').addEventListener('click', () => stepGallery(1))

    document.addEventListener('keydown', (event) => {
        if (projectGallery.hidden) return
        if (event.key === 'Escape') closeGallery()
        if (event.key === 'ArrowRight') stepGallery(1)
        if (event.key === 'ArrowLeft') stepGallery(-1)
        if (event.key !== 'Tab') return

        const items = galleryButtons()
        const first = items[0]
        const last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
        }
    })
}