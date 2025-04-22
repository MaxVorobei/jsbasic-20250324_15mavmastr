import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this._elem = this._render();
    this._addEventListeners();
    this._updateCarousel();
  }

  get elem() {
    return this._elem;
  }

  _render() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => this._renderSlide(slide)).join('')}
        </div>
      </div>
    `);

    return carousel;
  }

  _renderSlide(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  _addEventListeners() {
    const arrowRight = this._elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this._elem.querySelector('.carousel__arrow_left');

    arrowRight.addEventListener('click', () => {
      this.currentSlide++;
      this._updateCarousel();
    });

    arrowLeft.addEventListener('click', () => {
      this.currentSlide--;
      this._updateCarousel();
    });

    this._elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (!button) {return;}

      const slide = event.target.closest('.carousel__slide');
      const id = slide.dataset.id;

      this._elem.dispatchEvent(new CustomEvent('product-add', {
        detail: id,
        bubbles: true
      }));
    });
  }

  _updateCarousel() {
    const carouselInner = this._elem.querySelector('.carousel__inner');
    const arrowRight = this._elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this._elem.querySelector('.carousel__arrow_left');

    const slideWidth = carouselInner.offsetWidth;

    carouselInner.style.transform = `translateX(${-this.currentSlide * slideWidth}px)`;

    arrowLeft.style.display = this.currentSlide === 0 ? 'none' : '';
    arrowRight.style.display = this.currentSlide === this.slides.length - 1 ? 'none' : '';
  }
}