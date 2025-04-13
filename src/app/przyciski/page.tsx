import { ButtonExample } from "@/components/atoms/ButtonExample";
import { ButtonWithIconExample } from "@/components/atoms/ButtonWithIconExample";

export default function ButtonsPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl font-bold mb-6">Przykłady przycisków</h1>
			<div>
				<ButtonExample />
				<ButtonWithIconExample />
			</div>
		</div>
	);
}
