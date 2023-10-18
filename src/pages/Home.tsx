import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { scrollWithOffset } from 'data';
import { CombinedReducer } from 'store';
import { User } from 'interfaces/User';
import { uploadMetadataToIPFS } from 'utils';
import { mintingFee } from 'config';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import MintingNotificationModal from 'components/Home/MintingNotificationModal';
import About from 'components/Home/About';
import axios from 'axios';

const HomePage = () => {
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailPathOnIPFS, setThumbnailPathOnIPFS] = useState<string>();
  const [previewThumbnail, setPreviewThumbnail] = useState<string>();
  const [dragActiveThumbnail, setDragActiveThumbnail] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined);
  const [pdfFilePathOnIPFS, setPdfFilePathOnIPFS] = useState<string>();
  const [previewPdfFileName, setPreviewPdfFileName] = useState<string>();
  const [dragActivePdfFile, setDragActivePdfFile] = useState<boolean>(false);
  const [tokenName, setTokenName] = useState<string>('');
  const [datasetTitle, setDatasetTitle] = useState<string>('');
  const [datasetDescription, setDatasetDescription] = useState<string>('');
  const [royalties, setRoyalties] = useState<number | null>(10);
  const [notificationMessage, setNotificationMessage] = useState<string>('Minting process..');
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);

  const user = useSelector<CombinedReducer, User>((state) => state.user);

  const handleResetFile = (inputFileRef: any) => {
    if (inputFileRef.current) {
      inputFileRef.current.value = null;
    }
  };

  /* handle PDF input */
  const pdfRef = React.useRef<HTMLInputElement>(null);

  function handlePdfFile(files: File[]) {
    const file = files[0];
    console.log('file.type', file.type);
    if (file.type.toLowerCase() !== 'application/pdf') {
      return toast.warn('Only PDF file is supported!');
    }
    if (file.name.search(' ') > 0) {
      return toast.warn('The file name should not have a whitespace!');
    }
    setPdfFile(file);
    setPdfFilePathOnIPFS(undefined);
  }

  // handle drag events for PDF
  const handleDragForPdf = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActivePdfFile(true);
    } else if (e.type === 'dragleave') {
      setDragActivePdfFile(false);
    }
  };

  // triggers when file is dropped for PDF
  const handleDropForPdf = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActivePdfFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePdfFile(e.dataTransfer.files);
    }
  };

  // triggers when PDF file is selected with click
  const handleChangeForPdf = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handlePdfFile(e.target.files);
    }
  };

  // triggers the input when the PDF file input div is clicked
  const onPdfFileInputDivClick = () => {
    if (pdfRef?.current) {
      pdfRef.current.click();
    }
  };
  /* ----------------- */

  /* handle thumbnail input */
  const thumbnailRef = React.useRef<HTMLInputElement>(null);

  function handleThumbnailFile(files: File[]) {
    const file = files[0];
    if (file.name.search(' ') > 0) {
      return toast.warn('The file name should not have a whitespace!');
    }
    setThumbnail(file);
    setThumbnailPathOnIPFS(undefined);
  }

  // handle drag events for thumbnail
  const handleDragForThumbnail = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActiveThumbnail(true);
    } else if (e.type === 'dragleave') {
      setDragActiveThumbnail(false);
    }
  };

  // triggers when file is dropped for thumbnail
  const handleDropForThumbnail = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveThumbnail(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleThumbnailFile(e.dataTransfer.files);
    }
  };

  // triggers when thumbnail file is selected with click
  const handleChangeForThumbnail = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleThumbnailFile(e.target.files);
    }
  };

  // triggers the input when the thumbnail file input div is clicked
  const onThumbnailFileInputDivClick = () => {
    if (thumbnailRef?.current) {
      thumbnailRef.current.click();
    }
  };
  /* ----------------- */

  const inputRoyalties = (input: string) => {
    if (!input) return setRoyalties(null);

    if (Number(input) >= 0) setRoyalties(Number(input));
    else setRoyalties(0);
  };

  const handleMintDataNft = async () => {
    if (!user?.address) {
      return toast.warn('Please connect wallet or refresh browser!');
    }

    if (user?.usdcBalance < mintingFee) {
      return toast.warn('Insufficient USDC balance!');
    }

    if (!tokenName) {
      return toast.warn('Please input token name!');
    }

    if (!datasetTitle) {
      return toast.warn('Please input dataset title!');
    }

    if (!datasetDescription) {
      return toast.warn('Please input dataset description!');
    }

    if (!royalties || royalties < 0) {
      return toast.warn('Invalid royalties!');
    }

    if (!pdfFile) {
      return toast.warn('Please select PDF file!');
    }

    if (!thumbnail) {
      return toast.warn('Please select thumbnail!');
    }

    try {
      setIsMinting(true);
      setShowNotificationModal(true);
      let pdfFilePath = pdfFilePathOnIPFS;
      if (!pdfFilePath) {
        setNotificationMessage('Uploading PDF file..');
        pdfFilePath = await uploadMetadataToIPFS(tokenName, datasetDescription, pdfFile);
        setPdfFilePathOnIPFS(pdfFilePath);
      }

      let thumbnailPath = thumbnailPathOnIPFS;
      if (!thumbnailPath) {
        setNotificationMessage('Uploading thumbnail..');
        thumbnailPath = await uploadMetadataToIPFS(tokenName, datasetDescription, thumbnail);
        setThumbnailPathOnIPFS(thumbnailPath);
      }

      const data = {
        tokenName,
        datasetTitle,
        datasetDescription,
        royalties: royalties * 100,
        pdfFilePath,
        thumbnailPath,
      };

      setNotificationMessage('Minting NFT..');
      await axios.post('/api/mintingData/mint', data);
      setNotificationMessage('Minting is successful');
      setIsMinting(false);
      setIsSuccessful(true);

      setPdfFilePathOnIPFS(undefined);
      setThumbnailPathOnIPFS(undefined);
    } catch (e) {
      console.log('error in minting data nft', e);
      if (axios.isAxiosError(e)) {
        toast.error(e?.response?.data?.message?.toString(), { autoClose: 10000 });
      } else {
        toast.error('Failed to mint data NFT.');
      }
      setIsMinting(false);
      setIsSuccessful(false);
      setNotificationMessage('Failed to mint. Try again.');
    }
  };

  useEffect(() => {
    if (!showNotificationModal) {
      setNotificationMessage('Minting process..');
      setIsSuccessful(false);
    }
  }, [showNotificationModal]);

  useEffect(() => {
    if (!pdfFile) {
      setPreviewPdfFileName(undefined);
      return;
    } else {
      setPreviewPdfFileName(pdfFile.name);
    }
  }, [pdfFile]);

  useEffect(() => {
    if (!thumbnail) {
      setPreviewThumbnail(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(thumbnail);
    setPreviewThumbnail(objectUrl);

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
                  value={tokenName}
                  className='w-full rounded-[8px] bg-[#19191A] p-[12px] text-[16px] font-inter font-normal leading-[24px] mt-[12px] grey-placeholder border-none shadow-none focus:shadow-none outline-none'
                  placeholder='Token name'
                  onChange={(e) => setTokenName(e?.target?.value)}
                />
                <h6 className='text-[11px] text-[#77777D] font-inter font-medium leading-[16px] ml-[12px] mt-[8px]'>Between 3 and 20 alphanumeric characters only</h6>
              </div>

              {/* dataset title */}
              <div className='w-1/2'>
                <h6 className='text-[12px] font-inter font-medium leading-[16px]'>Enter dataset title</h6>

                <input
                  value={datasetTitle}
                  className='w-full rounded-[8px] bg-[#19191A] p-[12px] text-[16px] font-inter font-normal leading-[24px] mt-[12px] grey-placeholder border-none shadow-none focus:shadow-none outline-none'
                  placeholder='Dataset title'
                  onChange={(e) => setDatasetTitle(e?.target?.value)}
                />
                <h6 className='text-[11px] text-[#77777D] font-inter font-medium leading-[16px] ml-[12px] mt-[8px]'>Between 10 and 60 alphanumeric characters only</h6>
              </div>
            </div>

            {/* dataset description */}
            <div className='w-full mt-[16px]'>
              <h6 className='text-[12px] font-inter font-medium leading-[16px]'>Enter dataset description</h6>

              <textarea
                value={datasetDescription}
                rows={5}
                className='w-full rounded-[8px] bg-[#19191A] p-[12px] text-[16px] font-inter font-normal leading-[24px] mt-[12px] grey-placeholder border-none shadow-none focus:shadow-none outline-none'
                placeholder='Dataset description'
                onChange={(e) => setDatasetDescription(e?.target?.value)}
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
                value={royalties === null ? '' : royalties}
                type='number'
                className='bg-[#19191A] rounded-[8px] w-full max-w-[480px] text-[16px] font-inter font-normal leading-[24px] p-[12px] border-none shadow-none focus:shadow-none outline-none'
                placeholder='0'
                onChange={(e) => inputRoyalties(e?.target?.value)}
              />
            </div>
            <h6 className='text-[11px] text-[#77777D] font-inter font-medium leading-[16px] ml-[12px] mt-[8px]'>Between 0 and 50</h6>
          </div>

          {/* PDF file */}
          <div className='w-full mt-[32px]'>
            <h6 className='text-[12px] font-inter font-medium leading-[16px]'>
              PDF file
            </h6>
            <div className='flex items-center gap-[16px] w-full h-[160px] mt-[12px] cursor-pointer'>
              {
                previewPdfFileName && (
                  <div className='h-full aspect-square relative'>
                    <div className='flex justify-end absolute w-full h-full opacity-100 md:opacity-0 hover:opacity-100 transition-opacity duration-300 p-[10px]'>
                      <button
                        className='flex justify-center items-center w-[20px] h-[20px] rounded-full hover:bg-[#19191A]/60'
                        onClick={() => {
                          setPdfFile(undefined);
                          setPreviewPdfFileName(undefined);
                          handleResetFile(pdfRef);
                        }}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div className='flex justify-center items-center w-full h-full p-2 word-break text-center text-[#77777D] bg-[#020710]/20 border border-dashed border-[#28282A] rounded-[12px]'>{previewPdfFileName}</div>
                  </div>
                )
              }
              <div
                className='flex flex-col justify-center items-center gap-[8px] w-full h-full bg-[#020710]/20 backdrop-blur-[4.5px] border border-dashed border-[#28282A] rounded-[12px]'
                onClick={onPdfFileInputDivClick}
                onDragEnter={handleDragForPdf}
              >
                <input ref={pdfRef} type='file' onChange={handleChangeForPdf} className='hidden' />
                <h4 className='text-[16px] font-inter font-semibold leading-[24px] px-[20px]'>
                  <span>{'Drag & drop PDF here or '}</span>
                  <span className='text-[#CAFC01]'>Select in files</span>
                </h4>
                <h6 className='w-[218px] text-[11px] text-[#676767] text-center font-inter font-normal leading-[16px]'>
                  Supported format: PDF.
                </h6>

                {
                  dragActivePdfFile && (
                    <div
                      onDragEnter={handleDragForPdf}
                      onDragLeave={handleDragForPdf}
                      onDragOver={handleDragForPdf}
                      onDrop={handleDropForPdf}
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
              Thumbnail
            </h6>
            <div className='flex items-center gap-[16px] w-full h-[160px] mt-[12px] cursor-pointer'>
              {
                previewThumbnail && (
                  <div className='h-full aspect-square relative'>
                    <div className='flex justify-end absolute w-full h-full opacity-100 md:opacity-0 hover:opacity-100 transition-opacity duration-300 p-[10px]'>
                      <button
                        className='flex justify-center items-center w-[20px] h-[20px] rounded-full hover:bg-[#19191A]/60'
                        onClick={() => {
                          setThumbnail(undefined);
                          setPreviewThumbnail(undefined);
                          handleResetFile(thumbnailRef);
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
                onClick={onThumbnailFileInputDivClick}
                onDragEnter={handleDragForThumbnail}
              >
                <input ref={thumbnailRef} type='file' onChange={handleChangeForThumbnail} className='hidden' />
                <h4 className='text-[16px] font-inter font-semibold leading-[24px] px-[20px]'>
                  <span>{'Drag & drop image here or '}</span>
                  <span className='text-[#CAFC01]'>Select in files</span>
                </h4>
                <h6 className='w-[218px] text-[11px] text-[#676767] text-center font-inter font-normal leading-[16px]'>
                  Recommended formates: JPEG, JPG and PNG. Recommended 640x640 image.
                </h6>

                {
                  dragActiveThumbnail && (
                    <div
                      onDragEnter={handleDragForThumbnail}
                      onDragLeave={handleDragForThumbnail}
                      onDragOver={handleDragForThumbnail}
                      onDrop={handleDropForThumbnail}
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
              onClick={handleMintDataNft}
            >
              Mint Your Data NFT
            </button>
          </div>
        </div>
      </div>

      <About />

      <MintingNotificationModal
        show={showNotificationModal}
        isMinting={isMinting}
        isSuccessful={isSuccessful}
        notificationMessage={notificationMessage}
        handleShow={setShowNotificationModal}
      />
    </div>
  );
};

export const Home = () => (
  <HomePage />
);
