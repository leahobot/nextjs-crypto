import Link from "next/link";
import React from "react";

const Header = () => {
	return (
		<header>
			<div className="container header">
				<div className="logo">
					<h2>
						Next-TypeScript
						<span className="--color-danger"> Project</span>
					</h2>
				</div>

				<nav>
					<ul>
						<li>
							<Link href={"/"}>Home</Link>
						</li>
						<li>
							<Link href={"/about"}>About</Link>
						</li>
						<li className="--btn --btn-primary">
							<Link href={"/"}>Get Started</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;