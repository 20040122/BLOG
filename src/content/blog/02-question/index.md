---
title: "问题总结"
summary: "针对毕设可能的问题进行整理"
date: "2025-06-01"
draft: false
tags:
- LORA
---

## 代码补全的具体做法是什么？
使用经LoRA微调的CodeGen模型，不是查找已有的词条。前端向complete_code发送API请求，根据prompt**逐步 token 预测补全**，不是模板匹配或检索。使用采样策略控制生成：
top_k=30：从最可能的 30 个 token 中选择
top_p=0.9：保证生成内容在概率高区
temperature=0.3：控制随机性
自定义停止条件：
| 步骤 |          逻辑           |               目的               |
| :--: | :---------------------: | :------------------------------: |
|  1   |  计算已生成 token 数量  | 确保至少生成 token，防止提前终止 |
|  2   |   解码最后一个 token    |           是否为换行符           |
|  3   | 如果是 `\n`，则停止生成 |        实现“一行代码补全”        |

## 用户如何与系统进行交互？
选择 PyQt5-QFluentWidget组件，能快速开发跨平台图形界面，且与 Python AI 模型的集成较为自然，降低了开发成本。

## 模型如何选取？
从模型体量、资源消耗和微调可行性进行评估,
- CodeGen-350M**体量较小**（350M参数），**适合在有限算力资源下进行快速实验与迭代**。
- CodeT5 更偏向于 **代码理解与转换任务**，如摘要生成，具有良好的结构对齐能力。

## tokenizer 使用的是哪个 pad_token？
设置了 `tokenizer.pad_token = tokenizer.eos_token`因为原模型的 tokenizer 没有定义 `pad_token`，而 HuggingFace 的模型通常要求有 pad_token 以支持 batch padding 操作。将 pad_token 设为 eos_token 是一种常见的做法，可以保证 padding 时使用的 token 是模型已知的特殊符号。

## 为什么使用 autocast() 和 GradScaler()？
- **autocast()** 允许在前向和反向计算时自动使用半精度（float16）或单精度（float32）混合计算，以减少显存使用和提升计算速度
- **GradScaler()** 负责动态调整梯度缩放比例，避免由于 float16 表示范围有限导致的梯度下溢或溢出，从而保持训练的数值稳定性。

## 为什么inputs 和 labels 一样？
inputs 和 labels 在预处理时看起来一样，模型内部会把 labels 右移一位，确保预测第 t 个 token 时，只用第 1 到 t-1 个 token 作为条件。

## BLEU分数和ROUGE分数？
- BLEU-4 是机器翻译和代码生成任务中广泛采用的评估指标，有效衡量生成文本的质量。在代码生成任务中，BLEU-4 通过比较生成代码与参考代码的 n-gram（最多 4-gram）匹配程度，评估生成代码在结构和内容上与预期输出的相似性。
- ROUGE（Recall-Oriented Understudy for Gisting Evaluation）是一种常用于评估文本生成任务的指标，侧重于召回率（recall），即关注生成摘要是否包含了参考摘要中的重要信息。ROUGE-1：衡量生成摘要与参考摘要在 unigram（单个词） 上的重叠情况；ROUGE-2：衡量生成摘要与参考摘要在 bigram（两个连续词） 上的重叠情况；ROUGE-L：衡量生成摘要与参考摘要在 最长公共子序列（Longest Common Subsequence, LCS） 上的重叠情况
## 二者区分
假设参考摘要是“研究发现新药有效”，生成摘要是“新药有效”：
- BLEU-4 会因为生成摘要缺少“研究发现”而降低评分，关注精确度。
- ROUGE 会关注“新药有效”被成功覆盖，评估召回率，给出较高的召回率分数。