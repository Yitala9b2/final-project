import type { StorybookConfig } from '@storybook/react-webpack5';
import webpack, { Configuration } from 'webpack';

const config = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        //"@storybook/preset-scss",
        "@storybook/addon-mdx-gfm"
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpackFinal: async (config: Configuration): Promise<Configuration> => {
        if (config.module?.rules) {
            config.module.rules.push({
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
                include: /\.module\.scss$/,
            });

            config.module.rules.push({
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /\.module\.scss$/,
            });


        }
        return config;
    },
};
export default config;
