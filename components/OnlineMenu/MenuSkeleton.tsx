const MenuItemSkeleton = () => (
	<div className="border-dp-highlighter-ma-green/10 flex flex-col items-start gap-6 border-b py-7 md:flex-row">
		<div className="bg-dp-ma-red/10 h-48 w-full rounded-xl md:w-1/3" />
		<div className="w-full space-y-4 md:w-2/3">
			<div className="bg-dp-highlighter-ma-green/10 h-7 w-2/3 rounded" />
			<div className="bg-dp-highlighter-ma-green/10 h-5 w-1/2 rounded" />
			<div className="bg-dp-highlighter-ma-green/10 h-4 w-full rounded" />
			<div className="bg-dp-highlighter-ma-green/10 h-4 w-3/4 rounded" />
			<div className="flex gap-6 pt-4">
				{[1, 2, 3].map((i) => (
					<div
						key={i}
						className="bg-dp-highlighter-ma-green/10 h-10 w-28 rounded"
					/>
				))}
			</div>
		</div>
	</div>
);

const SidebarSkeleton = () => (
	<div className="bg-dp-softer-ma-cream sticky top-5 overflow-hidden rounded-2xl">
		<div className="bg-dp-highlighter-ma-green/10 h-64" />
		<div className="space-y-4 p-8">
			<div className="bg-dp-highlighter-ma-green/10 mx-auto h-8 w-3/4 rounded" />
			<div className="bg-dp-highlighter-ma-green/10 mx-auto h-5 w-full rounded" />
			<div className="bg-dp-highlighter-ma-green/10 mx-auto h-10 w-1/2 rounded" />
		</div>
	</div>
);

const MenuSkeleton = () => (
	<div className="animate-pulse pt-10 pb-20 lg:pb-40">
		{/* Tabs skeleton */}
		<div className="mb-10 flex gap-2 overflow-hidden rounded-4xl">
			{Array.from({ length: 7 }).map((_, i) => (
				<div
					key={i}
					className="bg-dp-ma-red/15 h-12 w-28 shrink-0 rounded-4xl"
				/>
			))}
		</div>

		{/* Content + Sidebar grid */}
		<div className="grid grid-cols-6 gap-12 lg:grid-cols-12">
			<div className="col-start-1 col-end-7 lg:col-end-10">
				{/* Description skeleton */}
				<div className="mb-8 space-y-3 py-6">
					<div className="bg-dp-highlighter-ma-green/10 h-4 w-full rounded" />
					<div className="bg-dp-highlighter-ma-green/10 h-4 w-5/6 rounded" />
				</div>
				{/* Items skeleton */}
				{Array.from({ length: 4 }).map((_, i) => (
					<MenuItemSkeleton key={i} />
				))}
			</div>
			<div className="col-span-6 lg:col-span-3">
				<SidebarSkeleton />
			</div>
		</div>
	</div>
);

export default MenuSkeleton;
