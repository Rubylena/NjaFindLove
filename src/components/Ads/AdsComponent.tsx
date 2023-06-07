import React, { useEffect } from "react";
// import { Adsense } from "@ctrl/react-adsense";

type AdsComponentProps = {
  className?: string;
};
const AdsComponent = (props: AdsComponentProps) => {

  useEffect(() => {
    // if (typeof window === 'object')
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      // (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) { console.log(e); }
  }, []);

  return (
    <ins
      className={`adsbygoogle${props.className} `}
      // style={{ display: "block", border: '1px solid', width: 500, height: 300 }}
      data-ad-client="ca-pub-2728151880619910"
      data-ad-slot={'8530285926'}
    // data-ad-format="auto"
    // data-full-width-responsive="true"
    ></ins>
    // <Adsense
    //   client="ca-pub-2728151880619910"
    //   slot="8530285926"
    //   // style={{ width: 500, height: 300 }}
    //   style={{ display: 'block', border: '1px solid' }}
    //   format="auto"
    //   responsive="true"
    // />
  );
};

export default AdsComponent;
