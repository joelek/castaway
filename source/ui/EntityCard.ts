import * as api from "../api/schema/objects";
import * as xnode from "../xnode";
import * as theme from "./theme";
import * as metadata from "./metadata";
import * as is from "../is";
import { EntityLinkFactory } from "./EntityLink";
import { ImageBoxFactory } from "./ImageBox";
import { PlaybackButtonFactory } from "./PlaybackButton";

const CSS = `
	.entity-card {
		align-items: start;
		display: grid;
		gap: 24px;
		grid-auto-rows: min-content;
		grid-template-columns: repeat(auto-fit, minmax(240px, auto));
	}

	.entity-card__artwork {
		border-radius: 2px;
		overflow: hidden;
		position: relative;
	}

	.entity-card__playback {
		position: absolute;
			bottom: 16px;
			right: 16px;
	}

	.entity-card__content {

	}

	.entity-card__whitespace {
		font-size: 16px;
		line-height: 0;
		overflow: hidden;
	}

	.entity-card__metadata {
		display: grid;
		gap: 16px;
	}

	.entity-card__titles {
		display: grid;
		gap: 8px;
	}

	.entity-card__title {
		color: ${theme.TEXT_0};
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.entity-card[data-header="true"]
	.entity-card__title {
		font-size: 20px;
	}

	.entity-card__subtitle {
		color: ${theme.TEXT_1};
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.entity-card[data-header="true"]
	.entity-card__subtitle {
		font-size: 20px;
	}

	.entity-card__tags {
		display: grid;
		gap: 8px;
		grid-auto-columns: minmax(auto, max-content);
		grid-auto-flow: column;
	}

	.entity-card__tag {
		background-color: ${theme.BACKGROUND_4};
		border-radius: 2px;
		color: ${theme.TEXT_1};
		font-size: 12px;
		padding: 4px 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.entity-card__tag--accent {
		background-color: ${theme.BACKGROUND_ACCENT};
		color: ${theme.TEXT_ACCENT};
	}

	.entity-card__description {
		color: ${theme.TEXT_1};
		font-size: 16px;
		line-height: 1.25;
		word-break: break-word;
	}
`;

export class EntityCardFactory {
	private EntityLink: EntityLinkFactory;
	private ImageBox: ImageBoxFactory;
	private PlaybackButton: PlaybackButtonFactory;

	private make(image: xnode.XElement, playbackButton: xnode.XElement | undefined, titles: xnode.XElement[], subtitles: xnode.XElement[], tags: xnode.XElement[], description?: string): xnode.XElement {
		return xnode.element("div.entity-card")
			.add(xnode.element("div.entity-card__artwork")
				.add(image)
				.add(xnode.element("div.entity-card__playback")
					.add(playbackButton)
				)
			)
			.add(xnode.element("div.entity-card__content")
				.add(xnode.element("div.entity-card__whitespace")
					.add(xnode.text(".".repeat(1000)))
				)
				.add(xnode.element("div.entity-card__metadata")
					.add(xnode.element("div.entity-card__titles")
						.add(xnode.element("div.entity-card__title")
							.add(...xnode.joinarray(titles))
						)
						.add(xnode.element("div.entity-card__subtitle")
							.add(...xnode.joinarray(subtitles))
						)
					)
					.add(xnode.element("div.entity-card__tags")
						.add(...tags)
					)
					.add(is.absent(description) ? undefined : xnode.element("div.entity-card__description")
						.add(xnode.text(description))
					)
				)
			);
	}

	constructor(EntityLink: EntityLinkFactory, ImageBox: ImageBoxFactory, PlaybackButton: PlaybackButtonFactory) {
		this.EntityLink = EntityLink;
		this.ImageBox = ImageBox;
		this.PlaybackButton = PlaybackButton;
	}

	forEntity(entity: api.Entity): xnode.XElement {
		if (api.Album.is(entity)) {
			return this.forAlbum(entity);
		}
		if (api.Artist.is(entity)) {
			return this.forArtist(entity);
		}
		if (api.Disc.is(entity)) {
			return this.forDisc(entity);
		}
		if (api.Episode.is(entity)) {
			return this.forEpisode(entity);
		}
		if (api.Person.is(entity)) {
			return this.forPerson(entity);
		}
		if (api.Playlist.is(entity)) {
			return this.forPlaylist(entity);
		}
		if (api.Movie.is(entity)) {
			return this.forMovie(entity);
		}
		if (api.Season.is(entity)) {
			return this.forSeason(entity);
		}
		if (api.Show.is(entity)) {
			return this.forShow(entity);
		}
		if (api.Track.is(entity)) {
			return this.forTrack(entity);
		}
		if (api.User.is(entity)) {
			return this.forUser(entity);
		}
		throw `Expected code to be unreachable!`;
	}

	forAlbum(album: api.Album, playbackButton: xnode.XElement = this.PlaybackButton.forAlbum(album)): xnode.XElement {
		let duration_ms = 0;
		for (let disc of album.discs) {
			for (let track of disc.tracks) {
				duration_ms += track.segment.file.duration_ms;
			}
		}
		let image = this.EntityLink.forAlbum(album).add(
			this.ImageBox.forSquare(is.absent(album.artwork) ? undefined : `/files/${album.artwork.file_id}/`)
		);
		let titles = [
			this.EntityLink.forAlbum(album)
		];
		let subtitles = album.artists.map((artist) => this.EntityLink.forArtist(artist));
		let tags = [
			"Album",
			`${album.year}`,
			metadata.formatDuration(duration_ms)
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		return this.make(image, playbackButton, titles, subtitles, tags);
	}

	forArtist(artist: api.Artist, playbackButton: xnode.XElement = this.PlaybackButton.forArtist(artist)): xnode.XElement {
		let duration_ms = 0;
		for (let album of artist.albums) {
			for (let disc of album.discs) {
				for (let track of disc.tracks) {
					duration_ms += track.segment.file.duration_ms;
				}
			}
		}
		let image = this.EntityLink.forArtist(artist).add(
			this.ImageBox.forSquare()
		);
		let titles = [
			this.EntityLink.forArtist(artist)
		];
		let subtitles = new Array<xnode.XElement>();
		let tags = [
			"Artist",
			metadata.formatDuration(duration_ms)
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		return this.make(image, playbackButton, titles, subtitles, tags);
	}

	forDisc(disc: api.Disc, playbackButton: xnode.XElement = this.PlaybackButton.forDisc(disc)): xnode.XElement {
		let duration_ms = 0;
		for (let track of disc.tracks) {
			duration_ms += track.segment.file.duration_ms;
		}
		let image = this.EntityLink.forDisc(disc).add(
			this.ImageBox.forSquare(is.absent(disc.album.artwork) ? undefined : `/files/${disc.album.artwork.file_id}/`)
		);
		let titles = [
			this.EntityLink.forAlbum(disc.album),
			this.EntityLink.forDisc(disc)
		];
		let subtitles = disc.album.artists.map((artist) => this.EntityLink.forArtist(artist));
		let tags = [
			"Disc",
			`${disc.album.year}`,
			metadata.formatDuration(duration_ms)
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		return this.make(image, playbackButton, titles, subtitles, tags);
	}

	forEpisode(episode: api.Episode, playbackButton: xnode.XElement = this.PlaybackButton.forEpisode(episode)): xnode.XElement {
		let duration_ms = 0;
		duration_ms += episode.segment.file.duration_ms;
		let image = this.EntityLink.forEpisode(episode).add(
			this.ImageBox.forVideo(`/media/stills/${episode.segment.file.file_id}/`)
		);
		let titles = [
			this.EntityLink.forEpisode(episode)
		];
		let subtitles = [
			this.EntityLink.forShow(episode.season.show),
			this.EntityLink.forSeason(episode.season)
		];
		let tags = [
			"Episode",
			`${episode.year}`,
			metadata.formatDuration(duration_ms)
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		if (is.present(episode.last_stream_date)) {
			tags.unshift(xnode.element("div.entity-card__tag.entity-card__tag--accent").add(xnode.text("\u2713")));
		}
		return this.make(image, playbackButton, titles, subtitles, tags, episode.summary);
	}

	forMovie(movie: api.Movie, playbackButton: xnode.XElement = this.PlaybackButton.forMovie(movie)): xnode.XElement {
		let duration_ms = 0;
		duration_ms += movie.segment.file.duration_ms;
		let image = this.EntityLink.forMovie(movie).add(
			this.ImageBox.forPoster(is.absent(movie.artwork) ? undefined : `/files/${movie.artwork.file_id}/`)
		);
		let titles = [
			this.EntityLink.forMovie(movie)
		];
		let subtitles = movie.genres.map((genre) => this.EntityLink.forGenre(genre));
		let tags = [
			"Movie",
			`${movie.year}`,
			metadata.formatDuration(duration_ms)
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		if (is.present(movie.last_stream_date)) {
			tags.unshift(xnode.element("div.entity-card__tag.entity-card__tag--accent").add(xnode.text("\u2713")));
		}
		return this.make(image, playbackButton, titles, subtitles, tags, movie.summary);
	}

	forPerson(person: api.Person): xnode.XElement {
		let image = this.EntityLink.forPerson(person).add(
			this.ImageBox.forSquare()
		);
		let titles = [
			this.EntityLink.forPerson(person)
		];
		let subtitles = [] as xnode.XElement[];
		let tags = [
			"Person"
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		return this.make(image, undefined, titles, subtitles, tags);
	}

	forPlaylist(playlist: api.Playlist, playbackButton: xnode.XElement = this.PlaybackButton.forPlaylist(playlist)): xnode.XElement {
		let duration_ms = 0;
		for (let item of playlist.items) {
			duration_ms += item.track.segment.file.duration_ms;
		}
		let image = this.EntityLink.forPlaylist(playlist).add(
			this.ImageBox.forSquare()
		);
		let titles = [
			this.EntityLink.forPlaylist(playlist)
		];
		let subtitles = [
			this.EntityLink.forUser(playlist.user)
		];
		let tags = [
			"Playlist",
			metadata.formatDuration(duration_ms)
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		return this.make(image, playbackButton, titles, subtitles, tags, playlist.description);
	}

	forSeason(season: api.Season, playbackButton: xnode.XElement = this.PlaybackButton.forSeason(season)): xnode.XElement {
		let duration_ms = 0;
		for (let episode of season.episodes) {
			duration_ms += episode.segment.file.duration_ms;
		}
		let image = this.EntityLink.forSeason(season).add(
			this.ImageBox.forPoster(is.absent(season.show.artwork) ? undefined : `/files/${season.show.artwork.file_id}/`)
		);
		let titles = [
			this.EntityLink.forShow(season.show),
			this.EntityLink.forSeason(season)
		];
		let subtitles = season.show.genres.map((genre) => this.EntityLink.forGenre(genre));
		let tags = [
			"Season",
			metadata.formatDuration(duration_ms)
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		return this.make(image, playbackButton, titles, subtitles, tags);
	}

	forShow(show: api.Show, playbackButton: xnode.XElement = this.PlaybackButton.forShow(show)): xnode.XElement {
		let duration_ms = 0;
		for (let season of show.seasons) {
			for (let episode of season.episodes) {
				duration_ms += episode.segment.file.duration_ms;
			}
		}
		let image = this.EntityLink.forShow(show).add(
			this.ImageBox.forPoster(is.absent(show.artwork) ? undefined : `/files/${show.artwork.file_id}/`)
		);
		let titles = [
			this.EntityLink.forShow(show)
		];
		let subtitles = show.genres.map((genre) => this.EntityLink.forGenre(genre));
		let tags = [
			"Show",
			metadata.formatDuration(duration_ms)
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		return this.make(image, playbackButton, titles, subtitles, tags, show.summary);
	}

	forTrack(track: api.Track, playbackButton: xnode.XElement = this.PlaybackButton.forTrack(track)): xnode.XElement {
		let duration_ms = 0;
		duration_ms += track.segment.file.duration_ms;
		let image = this.EntityLink.forTrack(track).add(
			this.ImageBox.forSquare(is.absent(track.disc.album.artwork) ? undefined : `/files/${track.disc.album.artwork.file_id}/`)
		);
		let titles = [
			this.EntityLink.forTrack(track)
		];
		let subtitles = [
			...track.artists.map((artist) => this.EntityLink.forArtist(artist)),
			this.EntityLink.forAlbum(track.disc.album)
		];
		let tags = [
			"Track",
			`${track.disc.album.year}`,
			metadata.formatDuration(duration_ms)
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		return this.make(image, playbackButton, titles, subtitles, tags);
	}

	forUser(user: api.User): xnode.XElement {
		let image = this.EntityLink.forUser(user).add(
			this.ImageBox.forSquare()
		);
		let titles = [
			this.EntityLink.forUser(user)
		];
		let subtitles = [
			xnode.element("span").add(xnode.text(user.username))
		];
		let tags = [
			"User"
		].map((tag) => xnode.element("div.entity-card__tag").add(xnode.text(tag)));
		return this.make(image, undefined, titles, subtitles, tags);
	}

	static makeStyle(): xnode.XElement {
		return xnode.element("style")
			.add(xnode.text(CSS));
	}
};
