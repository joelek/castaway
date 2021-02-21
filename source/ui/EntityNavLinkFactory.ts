import * as api from "../api/schema/objects";
import * as is from "../is";
import * as theme from "./theme";
import * as xnode from "../xnode";
import { IconFactory } from "./Icon";
import { EntityLinkFactory } from "./EntityLink";

const CSS = `
	.entity-nav-link {
		display: grid;
		gap: 16px;
		grid-template-columns: max-content max-content;
		justify-content: center;
	}

	.entity-nav-link__last,
	.entity-nav-link__next {
		display: grid;
		gap: 8px;
		justify-items: center;
	}

	.entity-nav-link__title {
		color: ${theme.TEXT_1};
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export class EntityNavLinkFactory {
	private iconFactory: IconFactory;
	private entityLinkFactory: EntityLinkFactory;

	private make(type: string, last: api.EntityBase | undefined, next: api.EntityBase | undefined): xnode.XElement {
		let lastLink = is.absent(last) ? xnode.element("span") : this.entityLinkFactory.forEntity(last);
		let nextLink = is.absent(next) ? xnode.element("span") : this.entityLinkFactory.forEntity(next);
		return xnode.element("div.entity-nav-link")
			.add(lastLink.add(
				xnode.element("div.entity-nav-link__last")
					.add(xnode.element("div.icon-button")
						.set("data-enabled", `${is.present(last)}`)
						.add(this.iconFactory.makeChevron({ direction: "left" }))
					)
					.add(xnode.element("div.entity-nav-link__title")
						.add(xnode.text(`Last ${type}`))
					)
				)
			)
			.add(nextLink.add(
				xnode.element("div.entity-nav-link__next")
					.add(xnode.element("div.icon-button")
						.set("data-enabled", `${is.present(next)}`)
						.add(this.iconFactory.makeChevron())
					)
					.add(xnode.element("div.entity-nav-link__title")
						.add(xnode.text(`Next ${type}`))
					)
				)
			);
	}

	constructor(iconFactory: IconFactory, entityLinkFactory: EntityLinkFactory) {
		this.iconFactory = iconFactory;
		this.entityLinkFactory = entityLinkFactory;
	}

	forDisc(last: api.DiscBase | undefined, next: api.DiscBase | undefined): xnode.XElement {
		return this.make("disc", last, next);
	}

	forEpisode(last: api.EpisodeBase | undefined, next: api.EpisodeBase | undefined): xnode.XElement {
		return this.make("episode", last, next);
	}

	forSeason(last: api.SeasonBase | undefined, next: api.SeasonBase | undefined): xnode.XElement {
		return this.make("season", last, next);
	}

	forTrack(last: api.TrackBase | undefined, next: api.TrackBase | undefined): xnode.XElement {
		return this.make("track", last, next);
	}

	static makeStyle(): xnode.XElement {
		return xnode.element("style")
			.add(xnode.text(CSS));
	}
};
