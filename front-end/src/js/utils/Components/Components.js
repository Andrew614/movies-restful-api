import Html from "../Html/Html";
import Api from "../Api/Api";
import picture from "../../../images/scenes.jpg";

export default () => new Components();

class Components {
	getAppContext() {
		return Html().select("#app");
	}

	getWrapperDiv() {
		return Html()
			.create("div")
			.addClass("wrapper");
	}

	renderContentBlock(requestedData) {
		const content = Html().create("section").addClass("content");
		const contentTitle = Html().create("h2").addClass("content__title").text(requestedData);
		const cardsContainer = Html().create("section").addClass("cards");
		Api().getRequest(`http://localhost:8080/api/${requestedData}`, (responseCollection) => {
			responseCollection.forEach((item) => {

				let name = item.name;
				if (item.title) {
					name = item.title;
				}
				let image = item.imageUrl;
				if (!image) {
					image = picture;
				}
				const cardBlock = Html().create('article').addClass('card');
				const cardLink = Html().create('a').addClass('card__link').addAttribute('href', `/${requestedData}/${item.id}`)
					.click((event) => {
						event.preventDefault();
						Api().getRequest(`http://localhost:8080/api/${requestedData}/${item.id}`, (data) => {
							this.renderPageSingleTypeCheck(data, requestedData)
						})
					});
				const imgContainer = Html().create('figure').addClass('card__image')
					.addChild(Html().create('img').addClass('card__image-item').addAttribute('src', image)
						.addAttribute('alt', 'atl pic'));
				const cardContent = Html().create('div').addClass('card__content')
					.addChild(Html().create('h3').addClass('card__content-item').text(name));
				cardLink.addChild(imgContainer);
				cardLink.addChild(cardContent);
				cardBlock.addChild(cardLink);
				cardsContainer.addChild(cardBlock);
			});
		});
		content.addChild(contentTitle);
		content.addChild(cardsContainer);
		return content;
	}

	renderMainContent(requestedData) {
		const mainContent = Html().create('main');
		const containerDiv = Html().create('div').addClass('container');
		const contentBlock = this.renderContentBlock(requestedData);
		containerDiv.addChild(contentBlock);
		mainContent.addChild(containerDiv);
		return mainContent;
	}

	renderMainFooter() {
		const footer = Html().create("footer").addClass("footer");
		const footerCopy = Html().create("small").addClass("footer__text").html("&copy; 2019");
		footer.addChild(footerCopy);
		return footer;
	}

	renderMainHeader() {
		const mainHeader = Html().create("header").addClass("main-header");
		const mainHeaderTitle = Html().create("h1").addClass("main-header__title").text("1-800-Movies");
		const nav = this.renderNav();
		mainHeader.addChild(mainHeaderTitle);
		mainHeader.addChild(nav);
		return mainHeader;
	}

	renderNav() {
		const nav = Html().create("nav").addClass("nav");
		const navList = Html().create("ul").addClass("nav__list");
		const navListItemOne = Html().create("li").addClass("nav__list-item").addChild(
			Html().create("a").addAttribute("href", "#").text("Actors")
				.click(event => {
					event.preventDefault();
					this.renderPageActors();
				})
		);
		const navListItemTwo = Html().create("li").addClass("nav__list-item").addChild(
			Html().create("a").addAttribute("href", "#").text("Movies")
				.click(event => {
					event.preventDefault();
					this.renderPageMovies();
				})
		);
		const navListItemThree = Html().create("li").addClass("nav__list-item").addChild(
			Html().create("a").addAttribute("href", "#").text("Scenes")
				.click(event => {
					event.preventDefault();
					this.renderPageScenes();
				})
		);
		navList.addChild(navListItemOne);
		navList.addChild(navListItemTwo);
		navList.addChild(navListItemThree);
		nav.addChild(navList);
		return nav;
	}

	renderPageActor(data) {
		this.renderPageSingle(data);
	}


	renderPageActors() {
		const currentContainerBlock = this.getWrapperDiv().select(".container");
		currentContainerBlock.replace(this.renderContentBlock("actors"));

	}

	renderPageMovie(data) {
		this.renderPageSingle(data);
	}

	renderPageMovies() {
		const currentContainerBlock = this.getWrapperDiv().select(".container");
		currentContainerBlock.replace(this.renderContentBlock("movies"));
	}

	renderPageScene(data) {
		const currentContainerBlock = this.getWrapperDiv().select('.container');
		const content = Html().create('section').addClass('content');
		const contentTitle = Html().create('h2').addClass('content__title').text(data.name);
		const cardsContainer = Html().create('section').addClass('cards')
		const cardBlock = Html().create('article').addClass('card');
		const cardLink = Html().create('a').addClass('card__link').addAttribute('href', data.link).addAttribute('target', '_blank');
		const imgContainer = Html().create('figure').addClass('card__image')
			.addChild(Html().create('img').addClass('card__image-item').addAttribute('src', picture)
				.addAttribute('alt', 'atl pic'));
		const cardContent = Html().create('div').addClass('card__content')
		const cardContentItem1 = Html().create('h3').addClass('card__content-item').text(data.name);
		const cardContentItem2 = Html().create('p').addClass('card__content-item').text(`Watch Scene`)
		cardContent.addChild(cardContentItem1);
		cardContent.addChild(cardContentItem2);
		cardLink.addChild(imgContainer);
		cardLink.addChild(cardContent);
		cardBlock.addChild(cardLink);
		cardsContainer.addChild(cardBlock);
		content.addChild(contentTitle);
		content.addChild(cardsContainer);
		currentContainerBlock.replace(content);
	}

	renderPageScenes() {
		const currentContainerBlock = this.getWrapperDiv().select(".container");
		currentContainerBlock.replace(this.renderContentBlock("scenes"));
	}

	renderPageSingle(data) {
		const currentContainerBlock = this.getWrapperDiv().select('.container');
		const content = Html().create('section').addClass('content');
		let info1 = data.name;
		if (data.title) {
			info1 = data.title;
		}
		let info2 = `Age: ${data.age}`;
		if (data.description) {
			info2 = data.description;
		}
		let img = data.imageUrl;
		const contentTitle = Html().create('h2').addClass('content__title').text(info1);
		const cardsContainer = Html().create('section').addClass('cards');
		const cardBlock = Html().create('article').addClass('card');
		const imgContainer = Html().create('figure').addClass('card__image')
			.addChild(Html().create('img').addClass('card__image-item').addAttribute('src', img)
				.addAttribute('alt', 'atl pic'));
		const cardContent = Html().create('div').addClass('card__content');
		const cardContentItem1 = Html().create('h3').addClass('card__content-item').text(info1);
		const cardContentItem2 = Html().create('p').addClass('card__content-item').text(info2);
		cardContent.addChild(cardContentItem1);
		cardContent.addChild(cardContentItem2);
		cardBlock.addChild(imgContainer);
		cardBlock.addChild(cardContent);
		cardsContainer.addChild(cardBlock);
		content.addChild(contentTitle);
		content.addChild(cardsContainer);
		currentContainerBlock.replace(content);
	}

	renderPageSingleTypeCheck(data, typeOfObject) {
		if (typeOfObject === 'actors') {
			this.renderPageActor(data);
		}
		if (typeOfObject === 'movies') {
			this.renderPageMovie(data);
		}
		if (typeOfObject === 'scenes') {
			this.renderPageScene(data);
		}
	}

	renderPageHome() {
		const app = this.getAppContext();
		const wrapperDiv = this.getWrapperDiv();
		const header = this.renderMainHeader();
		const content = this.renderMainContent('actors');
		const footer = this.renderMainFooter();
		wrapperDiv.addChild(header);
		wrapperDiv.addChild(content);
		wrapperDiv.addChild(footer);
		app.replace(wrapperDiv);
	}
}
