import Link from 'next/link';
import Image from 'next/image';
import { ethers } from "ethers";
import Swal from 'sweetalert2'


import { useEffect,useState } from "react"
import { useSelector } from 'react-redux';

export default function Token({ faucetContact,data,index }){
  const [tokenContract,setTokenContract] = useState(null)
  const [tokenBalance,setTokenBalance] = useState(null)
  const [transactionLoading,setTransactionLoading] = useState(false)

  const metamask = useSelector((state) => state.metamask)

  useEffect(() => {
    setupTokenBalance()
  },[])

  async function handleRedeemToken(amount){
    let amountWei = ethers.utils.parseUnits(amount,data.decimals)

    try{
      let transaction = await faucetContact.redeemToken(data.address,metamask.account,amountWei)
      setTransactionLoading(true)

      let result = await transaction.wait()
      Swal.fire({
        icon: 'success',
        title: 'Faucet Sent Tokens',
        showConfirmButton: true,
        confirmButtonText: 'Thanks',
        timer: 2000,
      })
      setTransactionLoading(false)
      setupTokenBalance()
    }catch(e){
      console.log(e)

      Swal.fire({
        icon: 'error',
        title: 'Faucet Contract Error',
        text: e.data?.message ?? e.message,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    }
  }

  async function setupTokenBalance(){
    let balanceBN = await faucetContact.getTokenFund(data.address)
    let balance = ethers.utils.formatUnits(balanceBN,data.decimals)
    setTokenBalance(ethers.utils.commify(parseInt(balance)))
  }

  return (
    <div className="border mockup-window bg-base-300">
      <div className="flex flex-col justify-center py-16 md:flex-row bg-base-200">
        <div className="md:card md:card-side">
          <figure className="text-center">
            <Image src={data.logoURI} alt="token_image" height={120} width={120}/>
          </figure>
          <div className="card-body">
            <h5 className="text-xl text-center md:card-title">{data.name}</h5>
            <div className="flex flex-col items-center my-1 md:my-0 md:flex-row md:justify-between">
              <p>Symbol : {data.symbol}</p>
              <p>Decimals : {data.decimals}</p>
            </div>
            <div className="justify-center md:justify-end card-actions">
              <Link href={data.addToMetamaskLink}>
                <a className="btn btn-info btn-outline">
                  <svg width="5.34em" height="1em" viewBox="0 0 512 96"> <path fill="#161616" d={`M444.19 25.125c3.088 0 5.978 1.013 8.519 2.922c2.655 1.987 4.101 5.104 4.414 8.845a.207.207 0 0 1-.127.252l-.108.02h-6.016c-.088 0-.176-.044-.215-.115l-.02-.08c-.704-5.415-7.304-6.896-11.288-4.246c-2.775 1.87-3.322 6.156-.664 8.337c1.04.858 2.238 1.542 3.454 2.203l3.217 1.75l2.825 1.449c1.411.725 2.808 1.475 4.137 2.352c4.57 3.039 6.092 7.637 5.27 12.74c-.934 5.222-5.544 10.248-14.45 10.248c-3.4 0-6.681-.935-9.688-3.195c-3.203-2.377-4.375-4.987-4.375-9.702c0-.087.066-.175.148-.213l.086-.02h6.522c.117 0 .235.116.235.233c0 .429.078 1.403.234 1.91c.9 2.805 3.476 4.597 6.799 4.792c3.046.195 6.092-1.48 7.264-3.897c1.29-2.649.352-6-2.616-7.83l-.381-.232l-1.409-.806l-1.7-.93l-8.206-4.326l-.498-.278l-.152-.091c-8.554-5.3-7.108-22.092 8.79-22.092Zm38.987.896c.088 0 .176.066.215.148l.02.086v17.533c0 .156.15.262.29.218l.1-.062l17.227-17.845a.26.26 0 0 1 .09-.066l.067-.012h8.32c.156 0 .262.15.219.29l-.063.1l-20.314 21.04a.232.232 0 0 0-.053.213l.053.098l22.578 23.26c.125.094.075.288-.03.381l-.087.049h-8.32l-.078-.025l-.078-.054l-19.53-20.104c-.094-.125-.288-.075-.362.05l-.03.106v19.793c0 .087-.065.175-.147.213l-.087.02h-6.525c-.087 0-.175-.065-.214-.147l-.02-.086V26.255c0-.088.066-.175.148-.214l.086-.02h6.525Zm-331.8-.039c.078 0 .14.018.183.064l.052.092l5.351 17.611a.244.244 0 0 0 .398.112l.071-.112l5.352-17.61a.289.289 0 0 1 .13-.134l.104-.023h9.883c.088 0 .176.066.214.148l.02.086V71.18c0 .087-.066.175-.148.213l-.086.02h-6.524c-.087 0-.175-.065-.214-.147l-.02-.086V37.01c0-.228-.271-.32-.407-.186l-.062.108l-5.39 17.728l-.391 1.246a.29.29 0 0 1-.13.133l-.104.023h-5c-.079 0-.14-.017-.183-.063l-.052-.093l-.39-1.246l-5.39-17.728c-.066-.195-.348-.2-.44-.039l-.03.117v34.17c0 .087-.066.175-.148.213l-.086.02h-6.524c-.088 0-.176-.065-.214-.147l-.02-.086V26.216c0-.088.066-.175.148-.214l.086-.02h9.961Zm189.416 0c.078 0 .139.018.182.064l.052.092l5.353 17.611a.244.244 0 0 0 .397.112l.072-.112l5.349-17.61a.289.289 0 0 1 .13-.134l.104-.023h9.923c.088 0 .176.066.214.148l.02.086V71.18c0 .087-.065.175-.148.213l-.086.02h-6.522c-.088 0-.176-.065-.214-.147l-.02-.086V37.01c0-.228-.272-.32-.408-.186l-.061.108l-5.392 17.728l-.39 1.246a.29.29 0 0 1-.131.133l-.104.023h-5c-.079 0-.14-.017-.183-.063l-.052-.093l-.391-1.246l-5.388-17.728c-.066-.195-.348-.2-.44-.039l-.03.117v34.17c0 .087-.065.175-.148.213l-.086.02h-6.525c-.088 0-.176-.065-.214-.147l-.02-.086V26.216c0-.088.065-.175.148-.214l.086-.02h9.923Zm-72.501 0a.22.22 0 0 1 .22.148l.014.086v5.61c0 .088-.066.176-.148.214l-.086.02h-11.914v39.12c0 .087-.066.175-.149.213l-.086.02h-6.523c-.088 0-.176-.065-.214-.147l-.02-.086V32.06H237.47c-.088 0-.176-.066-.214-.148l-.02-.086v-5.61c0-.089.066-.176.148-.215l.086-.02h30.82Zm32.148-.156c.079 0 .14.017.183.063l.052.093L312.94 71.1a.254.254 0 0 1-.126.285l-.108.027h-5.936a.299.299 0 0 1-.174-.08l-.06-.076l-3.555-13.13a.289.289 0 0 0-.13-.133l-.104-.023H289.62c-.079 0-.14.017-.183.063l-.052.093l-3.554 13.13a.289.289 0 0 1-.13.133l-.105.023h-5.937a.246.246 0 0 1-.237-.197l.002-.115l12.266-45.118a.289.289 0 0 1 .13-.133l.104-.023h8.515Zm101.251 0c.078 0 .139.017.182.063l.053.093L414.19 71.1a.254.254 0 0 1-.127.285l-.108.027h-5.935a.246.246 0 0 1-.183-.08l-.052-.076l-3.554-13.13a.289.289 0 0 0-.13-.133l-.105-.023h-13.125c-.078 0-.139.017-.182.063l-.052.093l-3.554 13.13a.289.289 0 0 1-.13.133l-.105.023h-5.938a.246.246 0 0 1-.237-.197l.002-.115l12.265-45.118a.289.289 0 0 1 .13-.133l.105-.023h8.515Zm-182.07.195c.087 0 .175.066.213.148l.02.086v5.61c0 .088-.065.176-.148.214l-.086.02h-19.766c-.088 0-.176.066-.214.148l-.02.086v11.923c0 .087.066.175.148.213l.086.02h17.383c.088 0 .176.066.215.148l.02.086v5.61c0 .088-.066.176-.149.214l-.086.02h-17.383c-.088 0-.176.066-.214.148l-.02.086V64.75c0 .104.035.173.093.22l.102.053h20.625c.088 0 .176.065.215.148l.02.085v5.923c0 .087-.066.175-.148.213l-.087.02h-27.578c-.088 0-.176-.065-.214-.148l-.02-.085V26.255c0-.088.066-.175.148-.214l.086-.02h26.758Zm76.797 7.948a.244.244 0 0 0-.398-.112l-.071.112l-4.766 17.572c-.03.117.03.234.126.285l.108.027h9.532a.246.246 0 0 0 .236-.197l-.002-.115l-4.765-17.572Zm101.25 0a.244.244 0 0 0-.398-.112l-.071.112l-4.766 17.572c-.03.117.03.234.126.285l.108.027h9.532a.246.246 0 0 0 .237-.197l-.002-.115l-4.766-17.572Z`}></path> <path fill="#E17726" d="M99.76 0L55.938 32.425l8.149-19.109z"></path> <path fill="#E27625" d="m2.47.038l35.577 13.28l7.738 19.36zm79.655 68.921l19.368.369l-6.769 22.995l-23.634-6.507zm-62.123 0l10.994 16.857l-23.595 6.508L.674 69.328z"></path><path fill="#E27625" d="m44.733 27.747l.792 25.565l-23.686-1.078l6.737-10.164l.086-.098zm12.416-.286l16.316 14.512l.085.098l6.737 10.163l-23.68 1.078zm-25.46 41.572L44.622 79.11l-15.023 7.253zm38.751-.001l2.047 17.331l-14.981-7.254z"></path><path fill="#D5BFB2" d="m57.837 78.16l15.202 7.361l-14.141 6.721l.147-4.442zm-13.551.003l-1.16 9.564l.095 4.51l-14.174-6.716z"></path><path fill="#233447" d="m39.896 56.648l3.973 8.349l-13.525-3.962zm22.334.001l9.598 4.386l-13.569 3.961z"></path><path fill="#CC6228" d="m32.723 68.948l-2.186 17.968l-11.718-17.575zm36.682 0l13.905.393l-11.762 17.576zm11.225-17.73L70.51 61.531l-7.801-3.565l-3.736 7.852l-2.448-13.503zm-59.137 0l24.109 1.097l-2.449 13.503l-3.736-7.851l-7.761 3.564z"></path><path fill="#E27525" d="m20.811 49.102l11.448 11.617l.397 11.469zm60.517-.021L69.462 72.208l.446-11.489zm-36.286.728l.461 2.901l1.139 7.225l-.732 22.19l-3.461-17.826l-.001-.184zm12.037-.04l2.601 14.346l-.001.184L56.21 82.17l-.138-4.47l-.541-17.897z"></path><path fill="#F5841F" d="m70.926 60.257l-.387 9.965l-12.078 9.41l-2.441-1.725l2.736-14.097zm-39.683.001l12.128 3.553l2.736 14.096l-2.441 1.725l-12.078-9.411z"></path><path fill="#C0AC9D" d="m26.736 83.321l15.451 7.321l-.065-3.127l1.293-1.134h15.293l1.339 1.131l-.099 3.124l15.354-7.297l-7.471 6.174l-9.034 6.205H43.291l-9.028-6.231z"></path><path fill="#161616" d="m56.73 77.186l2.185 1.543l1.28 10.214l-1.853-1.564H43.791l-1.818 1.596l1.239-10.245l2.185-1.544z"></path><path fill="#763E1A" d="m96.867.898l5.26 15.78l-3.285 15.956l2.339 1.805l-3.165 2.415l2.379 1.837l-3.15 2.869l1.934 1.401l-5.133 5.994l-21.052-6.129l-.182-.098l-15.17-12.797zM5.26.898l39.226 29.033l-15.171 12.797l-.182.098l-21.052 6.129l-5.132-5.994l1.932-1.4l-3.149-2.87l2.375-1.835l-3.213-2.422l2.428-1.806L0 16.679z"></path><path fill="#F5841F" d="M71.964 41.485L94.27 47.98l7.247 22.334H82.399l-13.174.166l9.58-18.673zm-41.801 0L23.32 51.807l9.582 18.673l-13.167-.166H.65L7.857 47.98zM65.18 13.209L58.94 30.06l-1.324 22.763l-.506 7.135l-.04 18.227H45.057l-.039-18.193l-.508-7.175l-1.325-22.757l-6.238-16.851z"></path> </svg>
                </a>
              </Link>
              <label htmlFor={`tokenModal-${index}`} className="btn btn-warning btn-outline modal-button">Get Token</label>
            </div>
          </div>
        </div>
      </div>

      <input type="checkbox" id={`tokenModal-${index}`} className="modal-toggle"/>
      <label htmlFor={`tokenModal-${index}`} className="cursor-pointer modal">
        <label className="relative modal-box" htmlFor="">
          <h3 className="my-1 text-lg font-semibold text-center">Faucet Fund : {tokenBalance != null ? tokenBalance : 'Loading...'}</h3>
          <h3 className="text-sm font-light text-center">{data.address}</h3>
          <div className="py-8">
            { transactionLoading == true ? (
              <>
                <button onClick={()=>{  }} className="w-full my-4 loading btn btn-outline">50 Token</button>
                <button onClick={()=>{  }} className="w-full my-0 loading btn btn-outline btn-primary">100 Token</button>
                <button onClick={()=>{  }} className="w-full my-4 loading btn btn-outline btn-warning">500 Token</button>
                <button onClick={()=>{  }} className="w-full my-0 loading btn btn-outline btn-success">1000 Token</button>
                <button onClick={()=>{  }} className="w-full my-4 loading btn btn-outline btn-info">1500 Token</button>
                <button onClick={()=>{  }} className="w-full my-0 loading btn btn-outline btn-accent">2000 Token</button>
              </>
            ) : (
              <>
                <button onClick={()=>{ handleRedeemToken('50') }} className="w-full my-4 btn btn-outline">50 Token</button>
                <button onClick={()=>{ handleRedeemToken('100') }} className="w-full my-0 btn btn-outline btn-primary">100 Token</button>
                <button onClick={()=>{ handleRedeemToken('500') }} className="w-full my-4 btn btn-outline btn-warning">500 Token</button>
                <button onClick={()=>{ handleRedeemToken('1000') }} className="w-full my-0 btn btn-outline btn-success">1000 Token</button>
                <button onClick={()=>{ handleRedeemToken('1500') }} className="w-full my-4 btn btn-outline btn-info">1500 Token</button>
                <button onClick={()=>{ handleRedeemToken('2000') }} className="w-full my-0 btn btn-outline btn-accent">2000 Token</button>
              </>
            ) }
          </div>
        </label>
      </label>

    </div>
  )
}
