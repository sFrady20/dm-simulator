import { EditorContactFields } from "@/components/editor/contact";
import { EditorMessagesFields } from "@/components/editor/messages";
import { EditorPreview } from "@/components/editor/preview";
import { EditorProvider } from "@/components/editor/provider";
import { EditorScreenshot } from "@/components/editor/screenshot";
import { EditorSystemFields } from "@/components/editor/system";
import { Page } from "@/components/ui/page";
import { Section, SectionContainer } from "@/components/ui/section";

export default function Home() {
  return (
    <EditorProvider>
      <Page>
        <Section>
          <SectionContainer>
            <div className="flex flex-row gap-4 my-8">
              <div className="text-left flex-1 max-w-[420px] flex flex-col gap-8">
                {/* <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    On Blast
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Create realistic-looking text message screenshots
                  </p>
                </div> */}
                <EditorContactFields />
                <EditorSystemFields />
                <EditorMessagesFields />
                <EditorScreenshot />
              </div>
              {/* <div className="flex-1 max-w-[420px]">
              </div> */}
              <div className="flex-1 flex flex-col items-center">
                <EditorPreview />
              </div>
            </div>
          </SectionContainer>
        </Section>
      </Page>
    </EditorProvider>
  );
}
