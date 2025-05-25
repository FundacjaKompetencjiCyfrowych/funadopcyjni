"use client";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useWindowSize } from "@react-hook/window-size";
import Link from "next/link";

const navigation = [
	{ name: "Aktualności", href: "#", current: true },
	{ name: "O fundacji", href: "#", current: false },
	{ name: "Centrum wsparcia", href: "#", current: false },
	{ name: "Wesprzyj nas", href: "#", current: false },
];

function classNames(
	...classes: (string | boolean | undefined | null)[]
): string {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const [width] = useWindowSize();
	const isMobile = width < 768;

	return (
		<Disclosure as="nav" className="bg-white">
			{({ open }) => (
				<>
					<div className="mx-auto w-full px-4 sm:px-8 md:px-8 lg:px-16">
						<div className="relative flex h-16 md:h-auto md:py-4 lg:h-16 lg:py-0 items-center justify-between">
							<div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-2 lg:gap-3">
								<Link
									href="/"
									className="flex items-center gap-2 sm:gap-3 md:gap-2 lg:gap-3"
								>
									<Image
										src="/assets/images/logo.png"
										alt="Logo"
										width={isMobile ? 36 : 64}
										height={isMobile ? 36 : 64}
										className="h-9 w-9 sm:h-12 sm:w-12 md:h-10 md:w-10 lg:h-16 lg:w-16"
									/>
									<p className="font-nunito text-sm font-semibold text-primary-text sm:text-base md:text-base md:font-bold lg:text-xl lg:font-semibold">
										Fundacja Adopcyjni
									</p>
								</Link>
							</div>

							<div className="hidden md:ml-6 md:block">
								<div className="flex gap-4 md:gap-8 lg:gap-8">
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											aria-current={item.current ? "page" : undefined}
											className={classNames(
												item.current ? "font-semibold" : "font-normal",
												"rounded-md px-0 py-2 font-nunito text-sm md:text-base lg:text-lg text-primary-text transition-all hover:underline hover:underline-offset-6 hover:decoration-2 hover:decoration-primary"
											)}
										>
											{item.name}
										</a>
									))}
								</div>
							</div>

							<div className="absolute inset-y-0 right-0 flex items-center md:hidden">
								<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-primary-text hover:bg-gray-light focus:outline-none focus:ring-2 focus:ring-primary">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Otwórz menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel className="md:hidden">
						<div className="space-y-1 px-4 pb-3 pt-2 flex flex-col justify-center items-center">
							{navigation.map((item) => (
								<DisclosureButton
									key={item.name}
									as="a"
									href={item.href}
									aria-current={item.current ? "page" : undefined}
									className={classNames(
										item.current ? "font-semibold" : "font-normal",
										"block rounded-md px-3 py-2 font-nunito text-base text-primary-text hover:underline hover:underline-offset-6 hover:decoration-2 hover:decoration-primary"
									)}
								>
									{item.name}
								</DisclosureButton>
							))}
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
}
