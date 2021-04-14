import Logo from "nullstack/logo";
import Bars from "poisonicon/bars/stroke";
import Ex from "poisonicon/ex/stroke";
import Translatable from "./Translatable";

class Header extends Translatable {
  expanded = false;

  renderLink({ title, href, target, onclick }) {
    return (
      <element
        tag={href ? "a" : "button"}
        href={href}
        target={target}
        onclick={onclick || (target ? false : { expanded: false })}
        rel={target ? "noopener" : false}
        class="w-full sm:w-auto border-b sm:border-0 border-gray-100 p-2 font-lg hover:text-pink-600 items-center flex"
      >
        {title}
      </element>
    );
  }

  toggleMode(context) {
    const nextOppositeMode = context.mode;
    context.mode = context.oppositeMode;
    context.oppositeMode = nextOppositeMode;
    window.localStorage.setItem("mode", context.mode);
  }

  render({ mode, oppositeMode }) {
    if (!this.i18n) return false;
    return (
      <header class="fixed w-full bg-white shadow top-0 left-0 z-50">
        <div class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-4">
          <div class="w-full sm:w-auto justify-between sm:justify-self-start sm:px-0 items-center flex">
            <a {...this.i18n.home}>
              <Logo height="30" light={mode === "dark"} />
            </a>
            <span
              onclick={{ expanded: !this.expanded }}
              class="flex items-center sm:hidden"
            >
              <element
                tag={this.expanded ? Ex : Bars}
                height={20}
                class="text-gray-900"
              />
            </span>
          </div>
          <nav
            class={`flex items-center flex-wrap sm:px-0 mt-2 sm:mt-0 ${
              !this.expanded && "hidden sm:flex"
            }`}
          >
            {this.i18n.links.map((link) => (
              <Link {...link} />
            ))}
            <Link
              title={this.i18n.mode[oppositeMode]}
              onclick={this.toggleMode}
            />
          </nav>
          <div
            class={`flex w-full sm:w-auto mt-4 sm:mt-0 ${
              !this.expanded && "hidden sm:flex"
            }`}
          >
            <a
              href={this.i18n.action.href}
              onclick={{ expanded: false }}
              class="bg-pink-600 text-white px-4 py-2 border border-pink-600 hover:bg-white hover:text-pink-600 w-full sm:w-auto"
            >
              {this.i18n.action.title}
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;