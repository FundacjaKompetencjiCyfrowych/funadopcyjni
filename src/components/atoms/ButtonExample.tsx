import React from "react";
import { Button } from "./Button";

export const ButtonExample = () => {
	return (
		<div className="flex flex-col gap-4 p-6 border border-gray-300 rounded-md mb-4">
			<h2 className="text-xl font-bold mb-2">Przyciski</h2>

			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-4">
					<Button>Wesprzyj nas</Button>
					<span className="text-sm text-gray-600">Stan domyślny</span>
				</div>

				<div className="flex items-center gap-4">
					<Button disabled>Wesprzyj nas</Button>
					<span className="text-sm text-gray-600">Stan disabled</span>
				</div>

				<div className="flex items-center gap-4">
					<Button icon={true}>Wesprzyj nas</Button>
					<span className="text-sm text-gray-600">Stan domyślny</span>
				</div>

				<div className="flex items-center gap-4">
					<Button disabled>Wesprzyj nas</Button>
					<span className="text-sm text-gray-600">Stan disabled</span>
				</div>
			</div>
		</div>
	);
};
