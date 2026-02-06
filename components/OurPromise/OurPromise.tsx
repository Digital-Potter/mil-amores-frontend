import Avocado from '../vectors/Avocado';
import Onions from '../vectors/Onions';
import Taco from '../vectors/Taco';

const OurPromise = () => {
	return (
		<section className="bg-dp-softer-ma-cream">
			<div className="dp-container">
				<div className="dp-container bm-7 lg:mb-10">
					<h3 className="text-center text-3xl lg:text-5xl">Our Promise</h3>
				</div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-9">
					<div className="flex flex-col items-center gap-9 p-8 text-center">
						<Onions />
						<div>
							<h4 className="text-dp-ma-orange mb-4 text-xl lg:text-3xl">
								Handcrafted
							</h4>
							<p className="text-balance">
								Every drink and dish at Mil Amores is handcrafted with care,
								using real ingredients and time-tested techniques. From
								cocktails to comfort food, we focus on quality you can taste in
								every bite and sip.
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-9 p-8 text-center">
						<Taco />
						<div>
							<h4 className="text-dp-ma-orange mb-4 text-xl lg:text-3xl">
								Delicious
							</h4>
							<p className="text-balance">
								Delicious means food that makes you pause and smile after the
								first bite. At Mil Amores, we focus on flavor, balance, and
								comfort, without overthinking it.
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-9 p-8 text-center">
						<Avocado />
						<div>
							<h4 className="text-dp-ma-orange mb-4 text-xl lg:text-3xl">
								Wallet-Friendly
							</h4>
							<p className="text-balance">
								We believe great food should feel accessible, not exclusive.
								That’s why Mil Amores delivers bold flavor and handcrafted
								quality at prices that make coming back easy.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurPromise;
