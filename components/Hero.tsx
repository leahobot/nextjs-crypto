import React from "react";
import Image from "next/image";

const Hero = () => {
	return (
		<section>
			<div className="container hero --flex-dir-column">
				<div className="hero-text">
					<h1>Buy Crypto Semlessly</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Fuga nisi placeat corrupti, atque non obcaecati.
					</p>

					<a
						href="#"
						className="--btn --btn-primary">
						Get Started
					</a>
				</div>

				<div className="hero-img">
					<Image
						src="/crypto.webp"
						alt="hero-image"
						width={280}
						height="470"
						style={{ objectFit: "cover" }}
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
