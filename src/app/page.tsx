import { EditorFields, EditorPreview } from "@/components/editor";
import { Page } from "@/components/page";
import { Section, SectionContainer } from "@/components/section";

export default function Home() {
  return (
    <Page>
      <Section>
        <SectionContainer>
          <div className="flex flex-row items-start justify-around gap-4 my-8">
            <div className="text-left w-full max-w-[420px]">
              <div className="my-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  On Blast
                </h1>
                <p className="text-gray-400 mt-2">
                  Create realistic-looking text message screenshots
                </p>
              </div>
              <EditorFields />
            </div>
            <EditorPreview />
          </div>
        </SectionContainer>
      </Section>
    </Page>
  );
}
