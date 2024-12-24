import Fetch from "@/utils/http";
import { ConfigParams, TermsConfig } from "./model/terms";

export const TermsConfigApi = (params: ConfigParams) => {
  return Fetch.post(
    process.env.CONFIG_API_URL,
    "/api/configCenter/config/get",
    params
  );
};


export const getTermsConfigApi = async (appid: string): Promise<TermsConfig> => {

  const res = await TermsConfigApi({
    moduleName: "WebsiteTerms",
    groupName: appid,
  });
  const configData = JSON.parse(res?.data?.config || "{}");

  const organizedData: TermsConfig = {};
  // 遍历原始数据
  for (const key in configData) {
    const [title, translation, lang] = key.split('_'); // 分解键

    // 过滤无效数据
    if (!title || !translation || !lang) continue;

    const mdUrl = configData[key][0]; // 获取 URL

    // 处理 title 以去掉空格
    const formattedTitle = title.replace(/\s+/g, '');

    // 初始化对象结构
    if (!organizedData[formattedTitle]) {
      organizedData[formattedTitle] = {};
    }

    // 添加语言信息
    organizedData[formattedTitle][lang] = {
      title: translation,
      url: btoa(mdUrl) // 使用 Base64 编码 URL
    };
  }

  return organizedData;
}