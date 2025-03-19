import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import z from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    summary: z.string().describe("quick summary of the entire entry."),
    subject: z.string().describe("the subject of the journal entry."),
    color: z
      .string()
      .describe(
        "a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.",
      ),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)",
      ),
  }),
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions below and format your response to match, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new ChatOpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.invoke(input);

  try {
    return parser.parse(result.content as string);
  } catch (e) {
    console.log(e);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const qa = async (question: string, entries: any[]) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    });
  });

  const model = new ChatOpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question);
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  });

  return res.output_text;
};

export { qa };
