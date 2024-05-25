const Banner = () => {
  return (
    <body>
      <nav>
        <div className="container flex justify-between py-6">
          <a href="index.html">
            <img
              src="./assets/images/logo.png"
              alt=""
              className="object-cover h-[40px]"
            />
          </a>

          <ul className="flex gap-4 text-sm text-gray-500">
            <li className="py-2 active">
              <a href="./index.html">Home</a>
            </li>

            <li className="py-2">
              <a href="./index.html">Recipe</a>
            </li>

            <li className="py-2">
              <a href="./index.html">About us</a>
            </li>

            <li className="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center">
              <a href="./login.html">Login</a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section className="container">
          <div className="py-4 bg-[url('./assets/images/cover.png')] rounded-lg p-4 md:p-12 min-h-[450px] bg-cover grid place-items-center grid-cols-12">
            <div className="col-span-12 md:col-span-6">
              <h1 className="font-bold text-3xl md:text-5xl text-white">
                Choose from thousands of recipes
              </h1>
              <p className="text-white my-4">
                Appropriately integrate technically sound value with scalable
                infomediaries negotiate sustainable strategic theme areas
              </p>
            </div>
          </div>
        </section>

        <section className="container py-8">
          <div className="grid grid-cols-12 py-4">
            <div className="col-span-12 md:col-span-3">
              <h3 className="font-bold text-xl">Recipes</h3>
              <ul className="pl-2 my-6 space-y-4 text-gray-500 text-sm">
                <li>
                  <a href="#">Morning Bliss Café</a>
                </li>

                <li>
                  <a href="#">Sunrise Bites Kitchen</a>
                </li>

                <li>
                  <a href="#">Brunch Haven Delights</a>
                </li>

                <li>
                  <a href="#">Rise & Dine Eatery</a>
                </li>

                <li>
                  <a href="#">Breakfast Oasis Junction</a>
                </li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8 justify-items-center">
                <div className="card">
                  <img
                    src="https://source.unsplash.com/-YHSwy6uqvk/300x160"
                    className="rounded-md"
                    alt=""
                  />
                  <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
                  <div className="py-2 flex justify-between text-xs text-gray-500">
                    <span>⭐️ 5.0</span>
                    <span>By: John Doe</span>
                  </div>
                </div>

                <div className="card">
                  <img
                    src="https://source.unsplash.com/-YHSwy6uqvk/300x160"
                    className="rounded-md"
                    alt=""
                  />
                  <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
                  <div className="py-2 flex justify-between text-xs text-gray-500">
                    <span>⭐️ 5.0</span>
                    <span>By: John Doe</span>
                  </div>
                </div>

                <div className="card">
                  <img
                    src="https://source.unsplash.com/-YHSwy6uqvk/300x160"
                    className="rounded-md"
                    alt=""
                  />
                  <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
                  <div className="py-2 flex justify-between text-xs text-gray-500">
                    <span>⭐️ 5.0</span>
                    <span>By: John Doe</span>
                  </div>
                </div>

                <div className="card">
                  <img
                    src="https://source.unsplash.com/-YHSwy6uqvk/300x160"
                    className="rounded-md"
                    alt=""
                  />
                  <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
                  <div className="py-2 flex justify-between text-xs text-gray-500">
                    <span>⭐️ 5.0</span>
                    <span>By: John Doe</span>
                  </div>
                </div>

                <div className="card">
                  <img
                    src="https://source.unsplash.com/-YHSwy6uqvk/300x160"
                    className="rounded-md"
                    alt=""
                  />
                  <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
                  <div className="py-2 flex justify-between text-xs text-gray-500">
                    <span>⭐️ 5.0</span>
                    <span>By: John Doe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
};

export default Banner;
