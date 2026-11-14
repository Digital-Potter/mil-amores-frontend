import type { StoreSettingsRecord } from '@/helpers/cms/types';
import {
	dismissedScript,
	noticeItemPaths,
	parseNotice,
} from '@/helpers/notice/notice';
import { noticeItemRoutes } from '@/helpers/notice/routes';

import NoticeBar from './NoticeBar';

type SiteNoticeProps = {
	settings: StoreSettingsRecord | null;
};

/**
 * Mounted above the header. Renders nothing at all (no wrapper, no script)
 * unless the store has an active notice.
 */
const SiteNotice = ({ settings }: SiteNoticeProps) => {
	const notice = parseNotice(settings?.noticePopup);
	if (!notice) return null;

	const itemPaths = noticeItemPaths(notice.showOn.items, (item) =>
		noticeItemRoutes(item, settings?.siteStructure),
	);

	return (
		<>
			<script
				dangerouslySetInnerHTML={{ __html: dismissedScript(notice.hash) }}
			/>
			<NoticeBar
				html={notice.content}
				hash={notice.hash}
				everywhere={notice.showOn.everywhere}
				homepage={notice.showOn.homepage}
				itemPaths={itemPaths}
			/>
		</>
	);
};

export default SiteNotice;
