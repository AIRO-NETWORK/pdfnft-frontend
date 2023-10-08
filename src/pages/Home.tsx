import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from 'data';

const HomePage = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full text-white'>
      <div
        id='home'
        className='flex flex-col md:flex-row justify-center items-center w-full max-w-[1280px] mt-[20px] md:mt-[60px]'
      >
        <div className='flex flex-col justify-center gap-[30px] w-full md:w-1/2 px-[20px] md:p-[10px]'>
          <div className='text-[35px] md:text-[80px] text-white leading-[1]'>
            <span className='font-worksans-black uppercase'>Welcome to PDFNFT.com</span>

            <div className='text-[18px] text-white font-normal mt-[20px]'>
              The Future of Document Ownership and Monetization is Here!
            </div>
          </div>

          <div className='flelx items-center w-full h-[85px] relative'>
            <div className='absolute top-0 left-0 w-[8px] h-full !bg-[linear-gradient(0deg,#CAFC01_0%,#CAFC01_100%)]'></div>

            <div className='flex items-center text-[23px] text-[#F5F2EA] opacity-60 pl-[50px] w-[500px] h-full'>
              As easy as: Connect. Upload. Pay. Mint.
            </div>
          </div>

          <div className='flex items-center gap-[73px] mt-[20px]'>
            <div className='flex flex-col'>
              <span className='text-[16px] text-[#F5F2EA] font-bold'>Ebooks</span>
              <div className='text-[67px] text-[#CAFC01] font-bold leading-[120%]'>1000+</div>
            </div>

            <div className='flex flex-col'>
              <span className='text-[16px] text-[#F5F2EA] font-bold'>Documents</span>
              <div className='text-[67px] text-[#CAFC01] font-bold leading-[120%]'>10000+</div>
            </div>
          </div>

          <div className='z-10 mt-[30px]'>
            <HashLink
              smooth
              to={'/#'}
              scroll={el => scrollWithOffset(el, 110)}
              className='text-[15px] text-black font-zendots font-semibold bg-[#CAFC01] rounded-full p-[12px_26px] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(0,0,0,.12)]'
            >
              Mint Now
            </HashLink>
          </div>
        </div>

        <div className='hidden md:flex justify-center items-center w-full md:w-1/2 p-[10px]'>
          <div className='relative w-[343px] h-[496px] rounded-[34px] bg-[#2A2B31]'>
            <div className='absolute top-[-22px] right-[-109px] w-[260px] h-[100px] rounded-[21px] bg-[#CAFC01] shadow-[0px_4px_14px_0px_rgba(202,252,1,0.74)]'></div>
            <div className='absolute bottom-[-58px] left-[-96px] w-[231px] h-[242px] rounded-[21px] bg-[linear-gradient(132deg,rgba(126,126,126,0.40)_3.01%,rgba(126,126,126,0.00)_107.67%)] backdrop-blur-[4.5px]'></div>
          </div>
        </div>
      </div>

      {/* What is PDFNFT.com? */}
      <div id='about' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[150px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          What is PDFNFT.com?
        </h1>

        <div className='flex flex-col gap-[10px] text-[18px] md:text-[20px] text-center'>
          <p>PDFNFT.com is a game-changing platform that empowers you to convert your PDF documents into secure and monetizable Non-Fungible Tokens (NFTs). Whether you're an aspiring author, a legal eagle, or someone who wants to safeguard precious documents, we've got you covered!</p>
        </div>
      </div>

      {/* How Does It Work?  */}
      <div id='' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          How Does It Work?
        </h1>

        <div className='w-full flex flex-col gap-[10px] text-[18px] md:text-[20px] mt-[20px]'>
          {/* Step 1 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Upload Your PDF:</span> Choose the PDF you wish to immortalize as an NFT.
            </div>
          </div>

          {/* Step 2 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Upload Your Cover:</span> Add a snazzy cover image for your document.
            </div>
          </div>

          {/* Step 3 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Pay a Fee:</span> A nominal $50 fee ensures your document's secure and everlasting storage.
            </div>
          </div>

          {/* Step 4 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Watch the Magic Happen:</span> Your document is uploaded to the cloud and Interplanetary File System, with a 99-year redundant storage guarantee.
            </div>
          </div>

          {/* Step 5 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Start Promoting:</span> You'll get a link to your document on the Itheum data marketplace, where you can start making a name for yourself!
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose PDFNFT.com? */}
      <div id='' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          Why Choose PDFNFT.com?
        </h1>

        <div className='w-full flex flex-col gap-[10px] text-[18px] md:text-[20px] mt-[20px]'>
          {/* 1 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Permanent Storage:</span> Your document enjoys a 99-year lifespan on the cloud and IPFS.
            </div>
          </div>

          {/* 2 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Monetization:</span> Turn your creations into a revenue stream on the Itheum data marketplace.
            </div>
          </div>

          {/* 3 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Authenticity:</span> Blockchain tech verifies your document's authenticity and ownership.
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div id='' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          Real-World Applications
        </h1>

        <div className='w-full flex flex-col gap-[10px] text-[18px] md:text-[20px] mt-[20px]'>
          {/* 1 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>For Self-Publishing Authors:</span> Publish your masterpiece without a middleman and keep all the profits!
            </div>
          </div>

          {/* 2 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>For Legal Professionals:</span> Securely store contracts and legal documents, with immutable proof of terms.
            </div>
          </div>

          {/* 3 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>For Personal Use:</span> Keep life's important documents, like birth certificates and marriage licenses, safe and sound.
            </div>
          </div>
        </div>
      </div>

      {/* The Old Way vs. The PDFNFT.com Way */}
      <div id='' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          The Old Way vs. The PDFNFT.com Way
        </h1>

        <div className='w-full flex flex-col gap-[10px] text-[18px] md:text-[20px] mt-[20px]'>
          {/* 1 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Ownership:</span> Traditional platforms like Amazon offer you a license, not ownership. We offer you indisputable ownership rights.
            </div>
          </div>

          {/* 2 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Author Autonomy:</span> Gain full control over pricing, updates, and distribution.
            </div>
          </div>

          {/* 3 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Security:</span> Say goodbye to piracy risks and hello to blockchain-verified security.
            </div>
          </div>

          {/* 4 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Costs and Time:</span> Skip the high costs and long waits of traditional publishing. Go live in a minute!
            </div>
          </div>
        </div>
      </div>

      {/* Ready to Take the Next Step? */}
      <div id='about' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          Ready to Take the Next Step?
        </h1>

        <div className='flex flex-col gap-[10px] text-[18px] md:text-[20px] text-center'>
          <p>Join PDFNFT.com today and be a part of the future of document storage and monetization.</p>
        </div>
      </div>

      {/* The Limitations of Traditional E-Book Platforms like Amazon */}
      <div id='' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          The Limitations of Traditional E-Book Platforms like Amazon
        </h1>

        <div className='w-full flex flex-col gap-[10px] text-[18px] md:text-[20px] mt-[20px] px-[50px]'>
          {/* 1 */}
          <div className='flex items-start gap-[20px]'>
            <span className='font-bold'>1.</span>
            <div>
              Ownership Constraints: Purchasing an e-book from conventional platforms like Amazon doesn't grant you full ownership. You're essentially acquiring a license that could be revoked at any time.
            </div>
          </div>

          {/* 2 */}
          <div className='flex items-start gap-[20px]'>
            <span className='font-bold'>2.</span>
            <div>
              Restricted Author Autonomy: Authors who publish through these platforms often find themselves with limited control over key aspects like pricing, updates, and distribution channels.
            </div>
          </div>

          {/* 3 */}
          <div className='flex items-start gap-[20px]'>
            <span className='font-bold'>3.</span>
            <div>
              Vulnerability to Piracy: The traditional e-book format is susceptible to unauthorized copying and sharing, posing a significant risk to an author's potential earnings.
            </div>
          </div>
        </div>
      </div>

      {/* The Financial Barriers of Conventional Self-Publishing */}
      <div id='' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          The Financial Barriers of Conventional Self-Publishing
        </h1>

        <div className='w-full flex flex-col gap-[10px] text-[18px] md:text-[20px] mt-[20px] px-[50px]'>
          {/* 1 */}
          <div className='flex items-start gap-[20px]'>
            <span className='font-bold'>1.</span>
            <div>
              1.	Upfront Expenses: Costs for ISBN registration, cover design, and formatting can quickly accumulate when using traditional self-publishing services.
            </div>
          </div>

          {/* 2 */}
          <div className='flex items-start gap-[20px]'>
            <span className='font-bold'>2.</span>
            <div>
              2.	Recurring Commissions: These platforms often take a sizable cut from each sale, diminishing the author's overall profit margin.
            </div>
          </div>
        </div>
      </div>

      {/* Sole Responsibility for Marketing */}
      <div id='about' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          Sole Responsibility for Marketing
        </h1>

        <div className='flex flex-col gap-[10px] text-[18px] md:text-[20px] text-center'>
          <p>Authors are left to their own devices when it comes to promoting their work, which can be both costly and time-consuming.</p>
        </div>
      </div>

      {/* Time-Consuming Process */}
      <div id='about' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          Time-Consuming Process
        </h1>

        <div className='flex flex-col gap-[10px] text-[18px] md:text-[20px] text-center'>
          <p>Traditional publishing can take weeks or even months to get your e-book live, delaying your entry into the market.</p>
        </div>
      </div>

      {/* Empowering Authors with Data NFTs */}
      <div id='' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px] mb-[50px]'>
        <h1 className='text-[32px] md:text-[40px] text-center font-worksans-black leading-[1]'>
          Empowering Authors with Data NFTs
        </h1>

        <div className='w-full flex flex-col gap-[10px] text-[18px] md:text-[20px] mt-[20px]'>
          {/* 1 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Unambiguous Ownership:</span> Converting your e-book into a Data NFT on PDFNFT.com provides indisputable, blockchain-verified ownership rights.
            </div>
          </div>

          {/* 2 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Customizable Copy Limits:</span> Data NFTs allow you to specify the maximum number of copies that can be made, offering a built-in solution to unauthorized distribution.
            </div>
          </div>

          {/* 3 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Direct Monetization:</span> The Itheum data marketplace enables you to set your own pricing strategy, giving you full control over how you monetize your work.
            </div>
          </div>

          {/* 4 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Enhanced Security:</span> Blockchain technology ensures that each e-book copy is distinct and fully traceable, significantly mitigating the risk of piracy.
            </div>
          </div>

          {/* 5 */}
          <div className='flex items-start gap-[10px]'>
            <div>
              <span className='font-bold'>Swift Publishing:</span> With PDFNFT.com, your e-book can be live in as little as a minute, allowing you to focus more on promotion and less on the publishing process.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home = () => (
  <HomePage />
);
