/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocPaginator from '@theme/DocPaginator';
import DocVersionSuggestions from '../DocVersionSuggestions';
import TOC from '@theme/TOC';
import clsx from 'clsx';
import styles from './styles.module.css';
import {
  useActivePlugin,
  useVersions,
  useActiveVersion,
} from '@theme/hooks/useDocs';
// import DocsRating from '../../../core/DocsRating';

function SponsorHeader() {
  return (
    <a
      href="https://datayi.cn/w/Yo1vDOv9"
      target="_blank"
      style={{
        display: 'block',
        padding: 12,
        backgroundColor: '#eee',
        color: '#666',
        marginBottom: 15,
      }}>
      <span style={{fontWeight: 'bold', color: '#05a5d1'}}>React 实战教程</span>{' '}
      深入学习一线大厂必备前端技能，VIP 教程限时免费领取。{' '}
      <span
        style={{
          border: 'solid 1px #666',
          padding: '4px 6px',
          marginLeft: 8,
          verticalAlign: 'middle',
        }}>
        立即查看 &gt;
      </span>
    </a>
  );
}

function DocItem(props) {
  const {siteConfig = {}} = useDocusaurusContext();
  const {url: siteUrl, title: siteTitle, titleDelimiter} = siteConfig;
  const {content: DocContent} = props;
  const {metadata} = DocContent;
  const {
    description,
    title,
    permalink,
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
    unversionedId,
  } = metadata;
  const {
    frontMatter: {
      image: metaImage,
      keywords,
      hide_title: hideTitle,
      hide_table_of_contents: hideTableOfContents,
    },
  } = DocContent;
  const {pluginId} = useActivePlugin({
    failfast: true,
  });
  const versions = useVersions(pluginId);
  const version = useActiveVersion(pluginId);
  const showVersionBadge = versions.length > 1 && !version.isLast;
  const metaTitle = title
    ? `${title} ${titleDelimiter} ${siteTitle}`
    : siteTitle;
  const metaImageUrl = useBaseUrl(metaImage, {
    absolute: true,
  });
  return (
    <div className={clsx('container padding-vert--lg', styles.docItemWrapper)}>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle} />
        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {keywords && keywords.length && (
          <meta name="keywords" content={keywords.join(',')} />
        )}
        {metaImage && <meta property="og:image" content={metaImageUrl} />}
        {metaImage && <meta property="twitter:image" content={metaImageUrl} />}
        {metaImage && (
          <meta name="twitter:image:alt" content={`Image for ${title}`} />
        )}
        {permalink && <meta property="og:url" content={siteUrl + permalink} />}
        {permalink && <link rel="canonical" href={siteUrl + permalink} />}
      </Head>
      <div className="row">
        <div
          className={clsx('col', {
            [styles.docItemCol]: !hideTableOfContents,
          })}>
          <DocVersionSuggestions />
          <div className={styles.docItemContainer}>
            <article>
              {showVersionBadge && (
                <div>
                  <span className="badge badge--secondary">
                    版本: {version.label}
                  </span>
                </div>
              )}
              {!hideTitle && (
                <header>
                  <h1 className={styles.docTitle}>{title}</h1>
                </header>
              )}
              <SponsorHeader />
              <div className="markdown">
                <DocContent />
              </div>
            </article>
            {/* <DocsRating label={unversionedId} /> */}
            {(editUrl || lastUpdatedAt || lastUpdatedBy) && (
              <div className="docMetadata margin-vert--xl">
                <div className="row">
                  <div className="col">
                    {editUrl && (
                      <a
                        href={editUrl}
                        target="_blank"
                        rel="noreferrer noopener">
                        <svg
                          fill="currentColor"
                          height="1.2em"
                          width="1.2em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 40 40"
                          style={{
                            marginRight: '0.3em',
                            verticalAlign: 'sub',
                          }}>
                          <g>
                            <path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z" />
                          </g>
                        </svg>
                        改进文档
                      </a>
                    )}
                  </div>
                  {(lastUpdatedAt || lastUpdatedBy) && (
                    <div className="col text--right">
                      <em>
                        <small className="docMetadata-updated">
                          最近更新{' '}
                          {lastUpdatedAt && (
                            <>
                              {' '}
                              <time
                                dateTime={new Date(
                                  lastUpdatedAt * 1000
                                ).toISOString()}
                                className={styles.docLastUpdatedAt}>
                                {new Date(
                                  lastUpdatedAt * 1000
                                ).toLocaleDateString('zh-CN')}
                              </time>
                              {lastUpdatedBy && ' '}
                            </>
                          )}
                          {lastUpdatedBy && (
                            <>
                              by <strong>{lastUpdatedBy}</strong>
                            </>
                          )}
                          {process.env.NODE_ENV === 'development' && (
                            <div>
                              <small>
                                (Simulated during dev for better perf)
                              </small>
                            </div>
                          )}
                        </small>
                      </em>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="margin-vert--lg">
              <DocPaginator metadata={metadata} />
            </div>
          </div>
        </div>
        {!hideTableOfContents && DocContent.toc && (
          <div className="col col--3">
            <TOC toc={DocContent.toc} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DocItem;
