import React, { useState } from 'react'
import Navbar from '../../components/Nav/Navbar'
import Footer from '../../components/Footer/Footer'
import Login from '../Login/Login'

const TermsAndConditions = () => {
  const [login, setLogin] = useState(false)

  return (
    <div className='flex flex-col justify-between 2xl:h-screen'>
      <Navbar action={() => setLogin(!login)} />
      <div className='p-10 text-justify flex flex-col gap-5'>
        <h1 className='font-medium text-2xl'>TERMS AND CONDITIONS</h1>
        <div>
          <h2 className='font-medium text-lg'>Introduction</h2>
          <p className='text-sm'>Welcome to [name of dating site] (the "Site"). The Site is operated by [name of company] (the "Company"). The following terms and conditions govern all use of the [name of dating site] website and all content, services, and products available at or through the website (taken together, the Website). The Website is offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies (including, without limitation, the Company's Privacy Policy) and procedures that may be published from time to time on this Site by the Company (collectively, the "Agreement").
          </p>
        </div>
        <div>
          <h2 className='font-medium text-lg'>Service Description</h2>
          <p className='text-sm'>The Site provides users with access to a variety of services, including, but not limited to, the ability to search for and communicate with other members, create and maintain a profile, and access certain content and information provided by the Site or its partners(the "Services").The Services may be used only by individuals who are 18 years or older and who can form legally binding contracts under applicable law.By using the Services, you represent and warrant that you meet the foregoing eligibility requirements.
          </p>
        </div>
        <div>
          <h2 className='font-medium text-lg'>Content</h2>
          <p className='text-sm'>All text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork, and computer code(collectively, "Content"), including but not limited to the design, structure, selection, coordination, expression, "look and feel" and arrangement of such Content, contained on the Website is owned, controlled or licensed by or to the Company, and is protected by copyright and trademark laws, and various other intellectual property rights laws.</p>
        </div>
        <div>
          <h2 className='font-medium text-lg'>User Content</h2>
          <p className='text-sm'>Users of the Site may submit or upload content to the Site, including but not limited to, photographs and written content(collectively, "User Content").You retain copyright and any other proprietary rights that you may hold in the User Content that you submit or upload to the Site.By submitting or uploading User Content to the Site, you grant the Company a perpetual, worldwide, irrevocable, unrestricted, non - exclusive, fully paid, royalty - free license to use, copy, license, sublicense, adapt, distribute, display, publicly perform, reproduce, transmit, modify, edit, and otherwise exploit such User Content, in all media now known or hereinafter created.</p>
        </div>
        <div>
          <h2 className='font-medium text-lg'>Registration and Membership</h2>
          <p className='text-sm'>In order to use the Services, you will be required to register as a member of the Site.You may only use the Site and the Services if you accept the terms and conditions of this Agreement.During the registration process, you will be required to provide the Company with certain information, including, but not limited to, your email address and a password(collectively, "Registration Data").You agree to provide accurate, current and complete Registration Data.The Company reserves the right to suspend or terminate your account if any Registration Data is inaccurate, untrue or incomplete.</p>
        </div>
        <div>
          <h2 className='font-medium text-lg'>Conduct</h2>
          <p className='text-sm'>You agree to use the Site and the Services only for lawful purposes and in accordance with the terms and conditions of this Agreement.You shall not post or transmit through the Site or Services any material that violates or infringes in any way upon the rights of others, that is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, obscene, profane or otherwise objectionable, or that encourages conduct that would constitute a criminal offense, give rise to civil liability or otherwise violate any law.</p>
        </div>
        <div>
          <h2 className='font-medium text-lg'>Modification of these terms of use</h2>
          <p className='text-sm'>The Company reserves the right, at its sole discretion, to change, modify, add or remove any portion of this app.</p>
        </div>
      </div>
      <Footer bg='bg-tint-pink' />
      {login && (
        <Login login={login} setLogin={setLogin} />
      )}
    </div>
  )
}

export default TermsAndConditions