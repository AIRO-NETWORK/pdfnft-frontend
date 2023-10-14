import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useGetAccountInfo, useGetLastSignedMessageSession, useSignMessage } from 'hooks';
import { useGetSignMessageSession } from '@multiversx/sdk-dapp/hooks/signMessage/useGetSignMessageSession';
import { Address } from '@multiversx/sdk-core/out';
import { SignableMessage } from '@multiversx/sdk-core';
import { SignedMessageStatusesEnum } from 'types';
import { scrollWithOffset } from 'data';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

const HomePage = () => {
  const { address } = useGetAccountInfo();
  const { sessionId, signMessage, onAbort } = useSignMessage();
  const signedMessageInfo = useGetLastSignedMessageSession();
  const messageSession = useGetSignMessageSession(sessionId);

  const [message, setMessage] = useState('How are you doing?');
  const [thumbnail, setThumbnail] = useState();
  const [previewThumbnail, setPreviewThumbnail] = useState<string>();
  const [activeCreateBtn, setActiveCreateBtn] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isValidThumbnail, setIsValidThumbnail] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (signedMessageInfo) {
      onAbort();
    }

    if (!message.trim()) {
      return;
    }

    const sinableMessage = await signMessage({
      message,
      callbackRoute: window.location.href
    });

    console.log('sinableMessage', sinableMessage);
    const string = new TextDecoder().decode(sinableMessage?.message);
    console.log('string', string);
  };

  useEffect(() => {
    if (signedMessageInfo && signedMessageInfo.status == SignedMessageStatusesEnum.signed) {
      console.log('signedMessageInfo', signedMessageInfo);
    }
  }, [signedMessageInfo]);

  /* handle file input */
  const inputRef: any = React.useRef(null);

  function handleFile(files: any) {
    setThumbnail(files[0]);
  }

  // handle drag events
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e: any) => {
    e.preventDefault();
    let isValid = false;
    if (e.target.files && e.target.files[0]) {
      isValid = true;
      setIsValidThumbnail(isValid);
      handleFile(e.target.files);
    }
  };

  // triggers the input when the file input div is clicked
  const onFileInputDivClick = () => {
    inputRef.current.click();
  };
  /* ----------------- */

  useEffect(() => {
    if (!thumbnail) {
      setPreviewThumbnail(undefined);
      setIsValidThumbnail(false);
      return;
    }

    const objectUrl = URL.createObjectURL(thumbnail);
    setPreviewThumbnail(objectUrl);
    setIsValidThumbnail(true);

    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnail]);

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

            <div className='flex items-center text-[23px] text-[#F5F2EA] opacity-60 pl-[50px] w-full max-w-[500px] h-full'>
              As easy as: Connect. Upload. Pay. Mint.
            </div>
          </div>

          <div className='flex items-center gap-[73px] mt-[20px]'>
            <div className='flex flex-col'>
              <span className='text-[16px] text-[#F5F2EA] font-bold'>Ebooks</span>
              <div className='text-[36px] md:text-[67px] text-[#CAFC01] font-bold leading-[120%]'>1000+</div>
            </div>

            <div className='flex flex-col'>
              <span className='text-[16px] text-[#F5F2EA] font-bold'>Documents</span>
              <div className='text-[36px] md:text-[67px] text-[#CAFC01] font-bold leading-[120%]'>10000+</div>
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

      {/* Mint the data NFT */}
      <div id='mint' className='flex justify-center items-center gap-[20px] w-full max-w-[848px] px-[20px] mt-[60px] md:mt-[180px]'>
        <div className='relative w-full p-[24px] rounded-[21px] bg-[linear-gradient(132deg,rgba(126,126,126,0.40)_3.01%,rgba(126,126,126,0.00)_107.67%)] backdrop-blur-[4.5px] overflow-hidden'>
          <div className='absolute left-0 flex justify-center w-full top-[-216px]'>
            <div className='w-[720px] h-[240px] bg-[#CAFC01] opacity-[0.64] blur-[48px]'></div>
          </div>

          {/* Title */}
          <div className='w-full'>
            <h3 className='text-[24px] font-semibold leading-[36px]'>Mint new NFT</h3>
          </div>

          {/* Token metadata */}
          <div className='w-full mt-[24px]'>
            <h4 className='text-[16px] font-inter font-semibold leading-[24px]'>
              Token Metadata
            </h4>

            <div className='flex justify-center items-center gap-[20px] w-full mt-[16px]'>
              {/* token name */}
              <div className='w-1/2'>
                <h6 className='text-[12px] font-inter font-medium leading-[16px]'>Enter token name</h6>

                <input
                  className='w-full rounded-[8px] bg-[#19191A] p-[12px] text-[16px] font-inter font-normal leading-[24px] mt-[12px] grey-placeholder border-none shadow-none focus:shadow-none outline-none'
                  placeholder='Token name'
                />
                <h6 className='text-[11px] text-[#77777D] font-inter font-medium leading-[16px] ml-[12px] mt-[8px]'>Between 3 and 20 alphanumeric characters only</h6>
              </div>

              {/* dataset title */}
              <div className='w-1/2'>
                <h6 className='text-[12px] font-inter font-medium leading-[16px]'>Enter dataset title</h6>

                <input
                  className='w-full rounded-[8px] bg-[#19191A] p-[12px] text-[16px] font-inter font-normal leading-[24px] mt-[12px] grey-placeholder border-none shadow-none focus:shadow-none outline-none'
                  placeholder='Dataset title'
                />
                <h6 className='text-[11px] text-[#77777D] font-inter font-medium leading-[16px] ml-[12px] mt-[8px]'>Between 10 and 60 alphanumeric characters only</h6>
              </div>
            </div>

            {/* dataset description */}
            <div className='w-full mt-[16px]'>
              <h6 className='text-[12px] font-inter font-medium leading-[16px]'>Enter dataset description</h6>

              <textarea
                rows={5}
                className='w-full rounded-[8px] bg-[#19191A] p-[12px] text-[16px] font-inter font-normal leading-[24px] mt-[12px] grey-placeholder border-none shadow-none focus:shadow-none outline-none'
                placeholder='Dataset description'
              />
              <h6 className='text-[11px] text-[#77777D] font-inter font-medium leading-[16px] ml-[12px] mt-[8px]'>Between 10 and 400 characters only. URL allowed.</h6>
            </div>
          </div>


          {/* Set Royalties */}
          <div className='w-full mt-[24px]'>
            <h4 className='text-[16px] font-inter font-semibold leading-[24px]'>
              Royalties
            </h4>

            <h6 className='text-[12px] font-inter font-medium leading-[16px] mt-[16px]'>
              Set royalties in sale
            </h6>

            <div className='flex items-center gap-[16px] mt-[12px]'>
              <input
                type='number'
                className='bg-[#19191A] rounded-[8px] w-full max-w-[480px] text-[16px] font-inter font-normal leading-[24px] p-[12px] border-none shadow-none focus:shadow-none outline-none'
                placeholder='0'
              />
            </div>
          </div>

          {/* PDF file */}
          <div className='w-full mt-[32px]'>
            <h6 className='text-[12px] font-inter font-medium leading-[16px]'>
              PDF file
            </h6>
            <div className='flex items-center gap-[16px] w-full h-[160px] mt-[12px] cursor-pointer'>
              <div
                className='flex flex-col justify-center items-center gap-[8px] w-full h-full bg-[#020710]/20 backdrop-blur-[4.5px] border border-dashed border-[#28282A] rounded-[12px]'
                onClick={onFileInputDivClick}
                onDragEnter={handleDrag}
              >
                <input ref={inputRef} type="file" onChange={handleChange} className='hidden' />
                <h4 className='text-[16px] font-inter font-semibold leading-[24px] px-[20px]'>
                  <span>{'Drag & drop PDF here or '}</span>
                  <span className='text-[#CAFC01]'>Select in files</span>
                </h4>
                <h6 className='w-[218px] text-[11px] text-[#676767] text-center font-inter font-normal leading-[16px]'>
                  Supported formates: PDF.
                </h6>

                {
                  dragActive && (
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className='absolute w-full h-full inset-0'
                    />
                  )
                }
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className='w-full mt-[32px]'>
            <h6 className='text-[12px] font-inter font-medium leading-[16px]'>
              Cover image
            </h6>
            <div className='flex items-center gap-[16px] w-full h-[160px] mt-[12px] cursor-pointer'>
              {
                previewThumbnail && (
                  <div className='h-full aspect-square relative'>
                    <div className='flex justify-end absolute w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 p-[10px]'>
                      <button
                        className='flex justify-center items-center w-[20px] h-[20px] rounded-full hover:bg-[#19191A]/60'
                        onClick={() => {
                          setThumbnail(undefined);
                          setPreviewThumbnail(undefined);
                          setActiveCreateBtn(false);
                        }}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <img src={previewThumbnail} alt='preview' className='w-full aspect-square rounded-[12px]' />
                  </div>
                )
              }

              <div
                className='flex flex-col justify-center items-center gap-[8px] w-full h-full bg-[#020710]/20 backdrop-blur-[4.5px] border border-dashed border-[#28282A] rounded-[12px]'
                onClick={onFileInputDivClick}
                onDragEnter={handleDrag}
              >
                <input ref={inputRef} type="file" onChange={handleChange} className='hidden' />
                <h4 className='text-[16px] font-inter font-semibold leading-[24px] px-[20px]'>
                  <span>{'Drag & drop image here or '}</span>
                  <span className='text-[#CAFC01]'>Select in files</span>
                </h4>
                <h6 className='w-[218px] text-[11px] text-[#676767] text-center font-inter font-normal leading-[16px]'>
                  Supported formates: JPEG, JPG and PNG. Recommended 640x640 image.
                </h6>

                {
                  dragActive && (
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className='absolute w-full h-full inset-0'
                    />
                  )
                }
              </div>
            </div>
          </div>

          <hr className='my-[24px] border-[#28282A]' />

          <div className='flex justify-end items-center w-full mt-[24px]'>
            <button
              className='text-[14px] md:text-[15px] text-[#0C0C0C] font-zendots font-semibold bg-[#CAFC01] shadow-[0px_4px_14px_0px_rgba(202,252,1,0.74)] rounded-full p-[8px_12px] md:p-[12px_22px] transition-all hover:translate-y-[-2px]'
              onClick={handleSubmit}
            >
              Mint Your Data NFT
            </button>
          </div>
        </div>
      </div>

      {/* What is PDFNFT.com? */}
      <div id='about' className='flex flex-col justify-center gap-[20px] w-full max-w-[1020px] px-[20px] mt-[60px] md:mt-[100px]'>
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
