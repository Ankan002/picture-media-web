import Head from "next/head";
import React from "react";

export type HeadComponentProps = {
    title: string
}


const HeadComponent = (props: HeadComponentProps) => {
    const {title} = props
    return(
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.svg" />
        </Head>
    )
    
}

export default HeadComponent
