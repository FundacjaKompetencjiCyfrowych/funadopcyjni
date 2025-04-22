import React from "react";
import { LinkButton } from "./LinkButton";

export const LinkButtonExample = () => {
	return (
		<div className="flex flex-col gap-4">
			<div>
				<h3 className="mb-2 text-lg font-bold">Link Button bez ikony:</h3>
				<div className="flex gap-4">
					<LinkButton href="/przyklad">Wesprzyj nas</LinkButton>
					<LinkButton href="/przyklad" disabled>
						Wesprzyj nas
					</LinkButton>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-lg font-bold">Link Button z ikoną:</h3>
				<div className="flex gap-4">
					<LinkButton href="/przyklad" icon>
						Wesprzyj nas
					</LinkButton>
					<LinkButton href="/przyklad" icon disabled>
						Wesprzyj nas
					</LinkButton>
				</div>
			</div>
		</div>
	);
};

export default LinkButtonExample;
