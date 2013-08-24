module hatemove {
    export interface BookmarkInfo {
        count?: string;
        url: string;
        original_url: string;
        has_asin: any; // 0 or 1 or ""
        title?: string;
        title_last_editor?: string;
        image_hatena_url?: string;
        image_url?: string;
        image_last_editor?: string;
        root_url?: string;
        is_private?: number; // 0 or 1
        favorites?: Favorite[];
        recommend_tags?: string[];
        eid?: string;
        entry_url?: string;
        isBookmarked?: boolean;
        bookmarked_data?: {
            user: string;
            epoch: number;
            comment_raw: string;
            private: boolean;
            eid: string;
            permalink: string;
            tags: string[];
            comment: string;
            timestamp: string;
        };
    }

    export interface Favorite {
        body: string;
        epoch: number;
        is_private: number; // 0 or 1
        name: string;
        tags: string[];
        timestamp: string;
    }
}
