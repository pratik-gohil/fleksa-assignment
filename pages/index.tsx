import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const dishes: string[] = [
  "20 min Chicken Fried Rice.png",
  "fish.png",
  "thali.png",
  "rolls.png",
  "pizza.png",
  "chinese_takeaway.png",
  "platter.png",
  "pista_topping_sweet.png"
];

const cities: string[] = [
  "Frankfurt.png",
  "Berlin.png",
  "Dresden.png",
  "Cologne.png",
  "Hamburg.png",
  "Munich.png"
];

const aboutSections: { img: string; title: string; summary: string }[] = [
  {
    img: "more money.png",
    title: "More Money",
    summary:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna"
  },
  {
    img: "risk_free.png",
    title: "100% Risk Free",
    summary:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna"
  },
  {
    img: "home_delivery.png",
    title: "Home Delivery",
    summary:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna"
  }
];

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Eatarian</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
      </Head>
      <div className={styles.section1}>
        <div className={styles.navbar}>
          <div className={styles.navbar_left}>
            <Image
              width="120"
              height="25"
              layout="intrinsic"
              alt="logo"
              className={styles.logo}
              src="/images/logo.png"
            />
          </div>
          <div className={styles.navbar_right}>
            <select className={styles.nav_item}>
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
            <button className={`${styles.nav_item} ${styles.sign_in}`}>
              Sign In
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_left}>
            <div className={styles.text}>
              <div className={styles.heading}>
                Your Favourite Food Delivered To You
              </div>
              <div className={styles.sub_heading}>
                Lorem ipsum dolor sit amet consectetuer adipiscing elit, sed
                diam nonummy nibh
              </div>
            </div>
            <div className={styles.find}>
              <input
                className={styles.find_inp}
                type="text"
                placeholder="Enter your location"
              />
              <button className={styles.find_btn}>Find</button>
            </div>
          </div>
          <div className={styles.content_right}>
            <Image
              width="400"
              height="400"
              layout="intrinsic"
              alt="dish"
              src="/images/dish.png"
            />
          </div>
        </div>
      </div>
      <div className={styles.section2}>
        <div className={styles.background_ellipse_section2}>
          The flavours of your wish
        </div>
        <div className={styles.grid}>
          {dishes.map((value, i) => (
            <div key={i} className={styles.dish}>
              <Image
                layout="fill"
                alt={value.split(".")[0]}
                key={i}
                src={`/images/${value}`}
                className={styles.dish_img}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section3}>
        <div className={styles.section3_heading}>
          Get your favourite food from the best restaurants in your city
        </div>
        <div className={styles.location_grid}>
          {cities.map((value, i) => (
            <div key={i} className={styles[`item${i}`]}>
              <Image
                className={styles.city}
                layout="fill"
                alt={value.split(".")[0]}
                src={`/images/${value}`}
              />
              <p className={styles.city_name}>{value.split(".")[0]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section4}>
        <div className={styles.background_ellipse_section4}>About Us</div>
        <div className={styles.about}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </div>
        <div className={styles.about_sub}>
          {aboutSections.map((sec, i) => (
            <div key={i}>
              <div className={styles.unset_sub_img}>
                <Image
                  layout="fill"
                  src={`/images/${sec.img}`}
                  alt={sec.img.split(".")[0]}
                  className={styles.sub_img}
                />
              </div>
              <div className={styles.sub_title}>{sec.title}</div>
              <div className={styles.sub_summary}>{sec.summary}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section5}>
        <div className={styles.section_left}>
          <div className={styles.border_elem}></div>
          <div className={styles.section5_box_content}>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum
            </div>
            <button className={styles.sign_up_store}>Sign up your store</button>
          </div>
        </div>
        <div className={styles.sticker}>Become a Partner</div>
      </div>
      <div className={styles.section6}>
        <div className={styles.section6_left}></div>
        <div className={styles.section6_right}>
          <div className={styles.section6_right_bg}>Download the app!</div>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum
          </p>
          <div>
            <button className={styles.download_btn}>
              <i className="fab fa-apple"></i>
              <span>Available on the app store</span>
            </button>
            <button className={styles.download_btn}>
              <i className="fab fa-google-play"></i>
              <span>Available on the app store</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <Image
            width="120"
            height="25"
            layout="intrinsic"
            alt="logo"
            className={styles.logo}
            src="/images/logo_white.png"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
          </p>
          <p>
            <i className="far fa-envelope"></i>
            <Link href="mailto:contact@eatarian.com">
              <a>contact@eatarian.com</a>
            </Link>
          </p>
          <p>
            <i className="fas fa-phone-alt"></i>
            <Link href="tel:+490000000000">
              <a>+49 000-000-0000</a>
            </Link>
          </p>
        </div>
        <div>
          <ul>
            <li>Lorem ipsum</li>
            <li>
              <Link href="/1">
                <a>Lorem ipsum</a>
              </Link>
            </li>
            <li>
              <Link href="/2">
                <a>Lorem ipsum</a>
              </Link>
            </li>
            <li>
              <Link href="/3">
                <a>Lorem ipsum</a>
              </Link>
            </li>
            <li>
              <Link href="/4">
                <a>Lorem ipsum</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Lorem ipsum</li>
            <li>
              <Link href="/6">
                <a>Lorem ipsum</a>
              </Link>
            </li>
            <li>
              <Link href="/7">
                <a>Lorem ipsum</a>
              </Link>
            </li>
            <li>
              <Link href="/8">
                <a>Lorem ipsum</a>
              </Link>
            </li>
            <li>
              <Link href="/9">
                <a>Lorem ipsum</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.social_links}>
          <p>
            Powered by <span className={styles.highlighted}>Fleksa</span>
          </p>
          <div>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook-f"></i>
          </div>
        </div>
      </div>
      <div className={styles.copy}>
        Copyright 2019 <span className={styles.highlighted}>Organic</span>. All
        rights reserved. Designed by
        <span className={styles.highlighted}>GraphicForest</span>.
      </div>
    </div>
  );
};

export default Home;
