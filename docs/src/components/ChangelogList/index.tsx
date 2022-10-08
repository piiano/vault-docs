import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import {usePluginData} from '@docusaurus/useGlobalData';

import styles from './styles.module.css';
import {BlogPost} from "@docusaurus/plugin-content-blog";

type Props = {
  count?: number
  className?: string
}

export default function ChangelogList({count = 10, className}: Props): JSX.Element {
  const {posts = []}: {posts?: Array<BlogPost>} = usePluginData('changelog-plugin', 'changelog') ?? {};

  // Slice given count of posts.
  const top = posts.slice(0, count);
  return (
    <section className={clsx(className, styles.changelogList)}>
      {top.map((post, index) => (
        <article key={index} className={clsx(styles.changelogItem)}>
          <div className={clsx(styles.changelogItemDate)}>{post.metadata.formattedDate}</div>
          <Link to={post.metadata.permalink} className={clsx(styles.changelogItemTitle)}>{post.metadata.title}</Link>
        </article>
      ))}
    </section>
  );
}
