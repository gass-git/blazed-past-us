export default function layout() {
  return `
    <div class="col-flexbox">
      <section>
        <header>
          <div class="logo">
            <div class="bolt-wrapper" id="bolt">
              <div class="top"></div>
              <div class="bottom"></div>
            </div>
          </div>
          <div>
            <div class="top">
              <a class="title" href="#/"></a>
              <div class="subtitle"></div>
            </div>
          </div>
        </header>
        <main>
          <div id="root"></div>
        </main>
      </section>
      <footer>
        <span>Powered by </span><span>⚡</span>
        <a href="https://github.com/gass-git/blazed-past-us"> blazed-past-us </a>
      </footer>
  </div>
  `;
}
