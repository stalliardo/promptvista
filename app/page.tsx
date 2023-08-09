import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Explore & Distribute
        <br className="max-md:hidden" />
        <span className="green_gradient text-center">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        PromptVista is a contemporary, open-source AI prompt generation tool designed for today's world. It empowers users to explore, craft, and share imaginative prompts.
      </p>

      <Feed />
    </section>
  )
}

export default Home