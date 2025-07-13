
import React from 'react';

type TButtonPair = {
    buttonOneLink?: string;
    buttonOneText: string;
    buttonOneDescription: string;
    buttonTwoLink?: string;
    buttonTwoText: string;
    buttownTwoDescription: string;
};

export const ButtonPair: React.FC<TButtonPair> = (props) => {
    return (   
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
            <a
                href={props.buttonOneLink}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                {props.buttonOneText}
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {props.buttonOneDescription}
                </p>
            </a>

            <a
                href={props.buttonTwoLink}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2 className={`mb-3 text-2xl font-semibold lg:text-right`}>
                {props.buttonTwoText}{" "}
                </h2>
                <p className={`m-0 text-sm opacity-50 lg:text-right`}>
                {props.buttownTwoDescription}
                </p>
            </a>
        </div>
    );
};
