var swiper = new Swiper('.mySwiper', {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	// autoplay: {
	// 	delay: 7000,
	// 	disableOnInteraction: false,
	// },
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

//Switch tab
function switchTab(tab) {
	var i
	var x = document.getElementsByClassName('tab')

	for (i = 0; i < x.length; i++) {
		x[i].style.display = 'none'
	}
	document.getElementById(tab).style.display = 'block'
}

$(document).ready(function (tab) {
	$('.button-tab').click(function (val) {
		$('.button-tab').toggleClass('active')
	})
})

// show and hide browser-category
var nav = document.getElementById('nav')
var browser = document.getElementById('browser-category')

function showMenu() {
	// nav.style.left = '0'
	nav.style.display = 'block'
	nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
}

function hideMenu() {
	// nav.style.left = '-400px'
	nav.style.display = 'none'
}

// Button Search Mobile
let searchButtonMobile = document.querySelector('#search-button-mobile')
let searchMobile = document.querySelector('.search-mobile')

searchButtonMobile.onclick = () => {
	searchMobile.classList.toggle('active')
}

// Modal filter
$(document).ready(function () {
	$('#filter_button').click(function () {
		$('.filter-modal').css('transform', 'scale(1)')
	})

	$('#close_button').click(function () {
		$('.filter-modal').css('transform', 'scale(0)')
	})
})

const modalContainer = document.querySelector('.filter-modal-container')
modalContainer.addEventListener('click', function (event) {
	event.stopPropagation()
})

//pangination
const ulTagUp = document.querySelector('.pagination-up')
const ulTagDown = document.querySelector('.pagination-down')

let totalPages = 25
let page = 5

element(totalPages, page)
element(totalPages, page)

function element(totalPages, page) {
	let liTag = ''
	let activeLi = ''
	let beforePages = page - 1
	let afterPages = page + 1

	if (page > 1) {
		// if page > 1 then show the previos button
		liTag += `<li class="button prev" onclick="element(totalPages, ${
			page - 1
		})">
                    <span><i class="fas fa-angle-left"></i> Prev</i></span>
                </li>`
	}
	if (page > 2) {
		// if page value > 2 then add new li tag with 1 value
		liTag += `<li class="numb" onclick="element(totalPages, 1)"><span>1</span></li>`
		if (page > 3) {
			liTag += `<li class="dots"><span>...</span></li>`
		}
	}

	// how many pages or li show before the current li
	if (page == totalPages) {
		// if page value = totalPage the substract -2 beforepage value
		beforePages = beforePages - 2
	} else if (page == totalPages - 1) {
		beforePages = beforePages - 1
	}
	// how many pages or li show after the current li
	if (page == 1) {
		afterPages = afterPages + 2
	} else if (page == 2) {
		afterPages = afterPages + 1
	}

	for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
		if (pageLength > totalPages) {
			continue
		}
		if (pageLength == 0) {
			// if pageLength = 0 add +1 in the pageLength Value
			pageLength = pageLength + 1
		}
		if (page == pageLength) {
			// if page value is equal to pagelength then assign the active string in the activeLi
			activeLi = 'active'
		} else {
			activeLi = ''
		}
		liTag += `<li class="numb ${activeLi}" onclick="element(totalPages, ${pageLength})"><span>${pageLength}</span></li>`
	}

	if (page < totalPages - 1) {
		if (page < totalPages - 2) {
			liTag += `<li class="dots"><span>...</span></li>`
		}
		liTag += `<li class="numb" onclick="element(totalPages, ${totalPages})"><span>${totalPages}</span></li>`
	}

	if (page < totalPages) {
		// if page < totalPages then show the previos button
		liTag += `<li class="button next" onclick="element(totalPages, ${
			page + 1
		})"><span>Next <i class="fas fa-angle-right"></i></span></li>`
	}
	ulTagUp.innerHTML = liTag
	ulTagDown.innerHTML = liTag
}
