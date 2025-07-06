import { Button, LinkButton } from "@/components/atoms";
export default function ButtonsPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl font-bold mb-6">Przykłady przycisków</h1>
			<div className="space-y-4">
				<div>
					<h2 className="text-lg font-semibold mb-2">Button</h2>
					<Button>Przykładowy przycisk</Button>
				</div>
				<div>
					<h2 className="text-lg font-semibold mb-2">LinkButton</h2>
					<LinkButton href="/">Przykładowy link</LinkButton>
				</div>
			</div>
		</div>
	);
}
