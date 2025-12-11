// /src/utils/i18n.ts

// 1. 导入您的 JSON 翻译文件
// 假设您的文件位于 /public/locales/zh/translation.json 和 /public/locales/en/translation.json
import zh from '../../public/locales/zh/translation.json';
import en from '../../public/locales/en/translation.json';

// 定义类型，以便 TypeScript 知道我们在处理什么
type Locale = 'zh' | 'en';
type TranslationFile = {
    [key: string]: string | TranslationFile;
};

// 将导入的翻译文件聚合到 resources 对象中
const resources: Record<Locale, TranslationFile> = {
    zh: zh as TranslationFile,
    en: en as TranslationFile,
};

/**
 * 获取特定语言的翻译函数。
 * * @param locale 当前的语言环境 ('zh' 或 'en')
 * @returns 翻译函数 t(key: string)
 */
export const getT = (locale: Locale) => {
    const translation = resources[locale];

    /**
     * 执行翻译查找。
     * @param key 翻译键，使用点分隔符 (如 'hero.callToAction')
     * @returns 翻译后的字符串，如果找不到则返回原键。
     */
    const t = (key: string): string => {
        const keys = key.split('.');
        let current: any = translation;

        for (const k of keys) {
            // 检查当前对象是否存在且包含该键
            if (current && typeof current === 'object' && k in current) {
                current = current[k];
            } else {
                // 找不到键，返回原始键以便调试
                console.warn(`Translation key not found for locale ${locale}: ${key}`);
                return key;
            }
        }
        
        // 确保最终结果是字符串
        return typeof current === 'string' ? current : key;
    };
    
    return t;
};