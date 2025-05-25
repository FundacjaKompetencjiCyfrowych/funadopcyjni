import React from "react";
import { Button } from "./Button";

export const ButtonExample = () => {
	return (
		<div className="flex flex-col gap-4 p-6 border border-gray-300 rounded-md mb-4">
			<h2 className="text-xl font-bold mb-2">Przyciski</h2>

			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-4">
					<Button>Wesprzyj nas</Button>
					<span className="text-sm text-gray">Wariant domyślny</span>
				</div>

				<div className="flex items-center gap-4">
					<Button disabled>Wesprzyj nas</Button>
					<span className="text-sm text-gray">Wariant domyślny - disabled</span>
				</div>

				<div className="flex items-center gap-4">
					<Button icon={true}>Wesprzyj nas</Button>
					<span className="text-sm text-gray">Wariant domyślny z ikoną</span>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="light">Czytaj więcej</Button>
					<span className="text-sm text-gray">Wariant light</span>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="light" icon={true}>
						Czytaj więcej
					</Button>
					<span className="text-sm text-gray">Wariant light z ikoną</span>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="light" disabled>
						Czytaj więcej
					</Button>
					<span className="text-sm text-gray">Wariant light - disabled</span>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="carousel">Zobacz więcej</Button>
					<span className="text-sm text-gray">Wariant carousel</span>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="carousel" icon={true}>
						Zobacz więcej
					</Button>
					<span className="text-sm text-gray">Wariant carousel z ikoną</span>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="carousel" disabled>
						Zobacz więcej
					</Button>
					<span className="text-sm text-gray">Wariant carousel - disabled</span>
				</div>
			</div>
		</div>
	);
};
