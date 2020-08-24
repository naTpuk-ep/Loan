import MainSlider from "./modules/slider/slider-main";
import VideoPlayer from "./modules/playVideo";
import SliderMini from "./modules/slider/slider-mini";
import Difference from "./modules/difference";
import Form from "./modules/form";
import Accordeon from "./modules/accordeon";
import Download from "./modules/download";
import PageSlider from "./modules/slider/pageSlider";

window.addEventListener('DOMContentLoaded', () => {
	// const slider = new MainSlider({container: '.page', btns: '.next'});
	// slider.render();

	// const modulePageSlider = new MainSlider({container: '.moduleapp', btns: '.next', next: '.nextmodule', prev: '.prevmodule'});
	// modulePageSlider.render();

	new PageSlider({container: '.page', next: '.next'}).render();

	new PageSlider({container: '.moduleapp', next: '.next', prev: '.prev'}).render();

	const showUpSlider = new SliderMini({
		container: '.showup__content-slider',
		next: '.showup__next',
		prev: '.showup__prev',
		activeClass: 'card-active',
		animate: true
	});
	showUpSlider.init();

	const modulesSlider = new SliderMini({
		container: '.modules__content-slider',
		next: '.modules__info-btns .slick-next',
		prev: '.modules__info-btns .slick-prev',
		activeClass: 'card-active',
		animate: true,
		auto: true
	});
	modulesSlider.init();

	const feedSlider = new SliderMini({
		container: '.feed__slider',
		next: '.feed__slider .slick-next',
		prev: '.feed__slider .slick-prev',
		activeClass: 'feed__item-active',
	});
	feedSlider.init();

	const player1 = new VideoPlayer('.showup .play', '.overlay');
	player1.init();

	const player2 = new VideoPlayer('.module__video-item .play', '.overlay');
	player2.init();

	new Difference('.difference__info-cards').init();

	new Form('.form').init();

	new Accordeon('.plus').init();

	new Download('.download').init();
});