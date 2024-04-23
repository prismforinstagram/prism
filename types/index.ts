export type Caption = {
	text: string,
}

export type User = {
	id: string,
	username: string,
	profile_pic_url: string,
	full_name: string,
}

export type Image = {
	height?: number,
	url: string,
	width?: number,
}

export type ImageVersions = {
	candidates: Image[],
}

export type Post = {
	id: string,
	user: User,
	image_versions2: ImageVersions,
	caption: Caption,
	taken_at: number,
	comment_count: number,
	like_count: number,
}

export type MediaOrAd = {
	media_or_ad: Post,
}